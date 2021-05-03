const sql = require('../config/db.connection');

const User = function(user)
{
    //this.id = user.id;
    this.nombre = user.nombre;
    this.correo = user.correo;
    this.pass = user.pass;
};

User.getAll = result => {
    sql.query("SELECT * FROM usuarios;", (err, res) => {
        if(err)
        {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        console.log("Users: ", res);
        result(null, res);
    });
};

User.create = (newUser, result) => {
    sql.query("CALL spInsertarUsuario(?, ?, ?);", [newUser.nombre, newUser.correo, newUser.pass], (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
      
        console.log("Created user: ", { ...newUser });
        result(null, { ...newUser });
    });
};

User.update = (id, updatedUser, result) => {
    sql.query("CALL spActualizarUsuario(?, ?, ?, ?);", [id, updatedUser.nombre, updatedUser.correo, updatedUser.pass], (err, res) => {
        if (err)
        {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows == 0)
        {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Updated user: ", { id: id, ...updatedUser });
        result(null, { id: id, ...updatedUser });
    });
};

User.delete = (id, result) => {
    sql.query("CALL spEliminarUsuario(?);", id, (err, res) => {
        if (err)
        {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows == 0)
        {
            //Not found employee with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Deleted user with id: ", id);
        result(null, res);
    });
};

User.login = (loggedUser, result) => {
    sql.query("CALL login(?, ?);", [loggedUser.correo, loggedUser.pass], (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        if(res[0].length > 0)
        {
            const userData = {
                id: res[0][0].id,
                nombre: res[0][0].nombre,
                correo: res[0][0].correo,
                password: res[0][0].pass
            };

            if(res[0][0].correo === loggedUser.correo && res[0][0].pass === loggedUser.pass)
            {
                console.log("Logged in user: ", { ...userData });
                result(null, { ...userData });
            }
            else
                result(null, { message: 'El correo y/o la contraseña son inválidos, favor de verificar.' });
        }
        else
            result(null, { message: 'El usuario no existe.' });
    });
};

module.exports = User;