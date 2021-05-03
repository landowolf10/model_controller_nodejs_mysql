const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');

router.get('/employee', employeeController.getAll);
router.post('/employee', employeeController.create);
router.put('/employee/:employeeID', employeeController.update);
router.delete('/employee/:employeeID', employeeController.delete);

module.exports = router;