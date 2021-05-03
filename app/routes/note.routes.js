const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes.controller');

router.post('/get_notes', notesController.getNotes);
router.post('/notes', notesController.createNote);
router.put('/notes/:noteID', notesController.updateNote);
router.delete('/notes/:id_nota', notesController.deleteNote);

module.exports = router;