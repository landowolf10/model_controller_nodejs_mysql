const User = require('../models/user.model');

exports.getAll = (req, res) => {
    User.getAll((err, data) => {
    if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while getting the users."
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

    const user = new User({
      nombre: req.body.nombre,
      correo: req.body.correo,
      pass: req.body.pass
    });

    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while creating the user."
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

  idUsuario = req.params.userID;

  const updatedUser = new User({
    nombre: req.body.nombre,
    correo: req.body.correo,
    pass: req.body.pass
  });

  User.update(idUsuario, updatedUser, (err, data) => {
    if (err)
    {
      if(err.kind === "not_found")
      {
        res.status(404).send({
          message: `Not user found with id ${idUsuario}.`
        });
      }
      else
      {
        res.status(500).send({
          message: "Error updating user with id " + idUsuario
        });
      }
    }
    else
      res.send(data);
  });
};

exports.delete = (req, res) => {
  if(!req.body)
  {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.delete(req.params.userID, (err, data) => {
    if (err)
    {
      if(err.kind === "not_found")
      {
        res.status(404).send({
          message: `Not found employee with id ${req.params.userID}.`
        });
      }
      else
      {
        res.status(500).send({
          message: `Could not delete user with id ${req.params.userID}`
        });
      }
    }
    else
      res.send({ message: `User with id ${req.params.userID} was deleted successfully!` });
  });
};

exports.login = (req, res) => {
  // Validate request
  if (!req.body)
  {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const login = new User({
    correo: req.body.correo,
    pass: req.body.pass
  });

  User.login(login, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user."
      });
    else
    {
      res.send({
        data: data
      });
    }
  });
};