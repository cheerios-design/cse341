const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students');
const validation = require('../middleware/validate');

router.get('/', studentsController.getAll);
router.get('/:id', studentsController.getSingle);
router.post('/', validation.validateStudent, studentsController.createStudent);
router.put('/:id', validation.validateStudent, studentsController.updateStudent);
router.delete('/:id', studentsController.deleteStudent);

module.exports = router;
