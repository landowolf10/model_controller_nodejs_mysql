const Employee = require('../models/employee.model');

exports.getAll = (req, res) => {
  Employee.getAll((err, data) => {
    if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Employee."
        });
      else
        res.send(data);
  });
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body)
    {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const employee = new Employee({
      nombre: req.body.name,
      salario: req.body.salary
    });
  
    // Save employee in the database
    Employee.create(employee, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Employee."
        });
      else
        res.send(data);
    });
};

exports.update = (req, res) => {
  if(!req.body)
  {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  idEmpleado = req.params.employeeID;

  const updatedEmployee = new Employee({
    nombre: req.body.nombre,
    salario: req.body.salario
  });

  Employee.update(idEmpleado, updatedEmployee, (err, data) => {
    if (err)
    {
      if(err.kind === "not_found")
      {
        res.status(404).send({
          message: `Not found employee with id ${idEmpleado}.`
        });
      }
      else
      {
        res.status(500).send({
          message: "Error updating employee with id " + idEmpleado
        });
      }
    }
    else
      res.send(data);
  });

  /*Employee.update(
    req.params.employeeID,
    new Employee(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found employee with id ${req.params.employeeID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating employee with id " + req.params.employeeID
          });
        }
      } else res.send(data);
    }
  );*/


};

exports.delete = (req, res) => {
  if(!req.body)
  {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Employee.delete(req.params.employeeID, (err, data) => {
    if (err)
    {
      if(err.kind === "not_found")
      {
        res.status(404).send({
          message: `Not found employee with id ${req.params.employeeID}.`
        });
      }
      else
      {
        res.status(500).send({
          message: `Could not delete employee with id ${req.params.employeeID}`
        });
      }
    }
    else
      res.send({ message: `Employee with id ${req.params.employeeID} was deleted successfully!` });
  });
};