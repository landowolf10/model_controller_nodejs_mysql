const sql = require('../config/db.connection');

const Employee = function(employee)
{
    this.nombre = employee.nombre;
    this.salario = employee.salario;
};

Employee.getAll = result => {
    sql.query("SELECT * FROM empleados;", (err, res) => {
        if(err)
        {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        console.log("Employees: ", res);
        result(null, res);
    });
};

Employee.create = (newEmployee, result) => {
    sql.query("CALL spInsertarEmpleado(?, ?);", [newEmployee.nombre, newEmployee.salario], (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
          }
      
          console.log("Created employee: ", { ...newEmployee });
          result(null, { ...newEmployee });
    });
};

Employee.update = (id, updatedEmployee, result) => {
    sql.query("CALL spActualizarEmpleado(?, ?, ?);", [id, updatedEmployee.nombre, updatedEmployee.salario], (err, res) => {
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

        console.log("Updated employee: ", { id: id, ...updatedEmployee });
        result(null, { id: id, ...updatedEmployee });
    });
};

Employee.delete = (id, result) => {
    sql.query("CALL spEliminarEmpleado(?);", id, (err, res) => {
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

        console.log("Deleted employee with id: ", id);
        result(null, res);
    });
};

module.exports = Employee;