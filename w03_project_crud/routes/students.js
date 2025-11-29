const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', studentsController.getAll);
router.get('/:id', studentsController.getSingle);
router.post('/', isAuthenticated, validation.validateStudent, studentsController.createStudent);
router.put('/:id', isAuthenticated, validation.validateStudent, studentsController.updateStudent);
router.delete('/:id', isAuthenticated, studentsController.deleteStudent);

module.exports = router;
