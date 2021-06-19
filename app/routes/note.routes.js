const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes.controller');

router.get('/notes/:id_creador', notesController.getNotes);
router.post('/notes', notesController.createNote);
router.put('/notes', notesController.updateNote);
router.delete('/notes/:id_nota', notesController.deleteNote);

module.exports = router;