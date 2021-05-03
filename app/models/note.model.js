const sql = require('../config/db.connection');
const User = require('./user.model');

const Notes = function(notes)
{
    this.id_creador = notes.id_creador;
    this.nombre_creador = notes.nombre_creador;
    this.titulo = notes.titulo;
    this.contenido = notes.contenido;
};

Notes.getNotes = (note, result) => {
    sql.query("CALL spMostrarNotas(?);", [note.id_creador], (err, res) => {
        if(err)
        {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        console.log("Notes: ", res[0]);
        result(null, res[0]);
    });
};

Notes.creatNote = (note, result) => {
    sql.query("CALL spCrearNota(?, ?, ?);", [note.id_creador, note.titulo, note.contenido], (err, res) => {
        if(err)
        {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        console.log("Created note: ", { ...note });
        result(null, { ...note });
    });
};

Notes.updateNote = (id, note, result) => {
    sql.query("CALL spActualizarNota(?, ?, ?);", [id, note.titulo, note.contenido], (err, res) => {
        if(err)
        {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows == 0)
        {
            result({ kind: "not_found" }, null);
        }

        console.log("Updated note: ", { id, ...note });
        result(null, { id, ...note });
    });
};

Notes.deletNote = (id, result) => {
    sql.query("CALL spEliminarNota(?);", id, (err, res) => {
        if(err)
        {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows == 0)
        {
            //Not note found with the given id.
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Deleted note with id: ", id);
        result(null, res);
    });
};

module.exports = Notes;