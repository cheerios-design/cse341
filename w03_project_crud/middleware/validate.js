const Joi = require('joi');

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const studentSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(0).required(),
  currentCollege: Joi.string().required(),
  courses: Joi.array().items(Joi.string()).required(),
  gpa: Joi.number().min(0).max(4.0).required(),
  enrollmentDate: Joi.date().required()
});

const courseSchema = Joi.object({
  courseCode: Joi.string().required(),
  courseName: Joi.string().required(),
  credits: Joi.number().integer().min(1).max(5).required(),
  instructor: Joi.string().required()
});

exports.validateStudent = (req, res, next) => {
  const { error } = studentSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
};

exports.validateCourse = (req, res, next) => {
  const { error } = courseSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
};
