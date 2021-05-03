const Notes = require('../models/note.model');

exports.getNotes = (req, res) => {
    if(!req.body)
    {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    const note = new Notes({
        id_creador: req.body.id_creador
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

    const idNota = req.params.noteID;

    const note = new Notes({
        titulo: req.body.titulo,
        contenido: req.body.contenido
    });

    Notes.updateNote(idNota, note, (err, data) => {
        if(err)
        {
            if(err.kind === "not_found")
            {
                res.status(404).send({
                    message: `No note found with id ${idNota}.`
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