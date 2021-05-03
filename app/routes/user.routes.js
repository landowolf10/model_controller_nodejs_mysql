const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/user', userController.getAll);
router.post('/user', userController.create);
router.put('/user/:userID', userController.update);
router.delete('/user/:userID', userController.delete);
router.post('/login', userController.login);

module.exports = router;