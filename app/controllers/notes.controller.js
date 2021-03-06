const Notes = require('../models/note.model');

exports.getNotes = (req, res) => {
    if(!req.body)
    {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    const note = new Notes({
        id_creador: req.params.id_creador
    });

    Notes.getNotes(note, (err, data) => {
        if(err)
            res.status(500).send({
                message: err.message || 'Some error occurred while getting the notes.'
            });
        else
            res.send(data);
    });
};

exports.createNote = (req, res) => {
    if(!req.body)
    {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    const note = new Notes({
        id_creador: req.body.id_creador,
        titulo: req.body.titulo,
        contenido: req.body.contenido
    });

    Notes.creatNote(note, (err, data) => {
        if(err)
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the note.'
            });
        else
            res.send(data);
    });
};

exports.updateNote = (req, res) => {
    if(!req.body)
    {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    const note = new Notes({
        id_nota: req.body.id_nota,
        titulo: req.body.titulo,
        contenido: req.body.contenido
    });

    Notes.updateNote(note, (err, data) => {
        if(err)
        {
            if(err.kind === "not_found")
            {
                res.status(404).send({
                    message: `No note found with id ${note.id_nota}.`
                });
            }
        }
        else
            res.send(data);
    }); 
};

exports.deleteNote = (req, res) => {
    if(!req.body)
    {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    Notes.deletNote(req.params.id_nota, (err, data) => {
        if(err)
        {
            if(err.kind === "not_found")
            {
                res.status(400).send({
                    message: `No note found with id ${req.params.id_nota}.`
                });
            }
            else
            {
                res.status(500).send({
                    message: `Could not delete note with id ${req.params.id_nota}`
                });
            }
        }
        else
            res.send({
                message: `Note with id ${req.params.id_nota} was deleted successfully!`
            });
    });
};