const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('courses').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid course id to find a course.');
    }
    const courseId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('courses').find({ _id: courseId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const course = {
      courseCode: req.body.courseCode,
      courseName: req.body.courseName,
      credits: req.body.credits,
      instructor: req.body.instructor
    };
    const response = await mongodb.getDb().db().collection('courses').insertOne(course);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the course.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid course id to update a course.');
    }
    const courseId = new ObjectId(req.params.id);
    const course = {
      courseCode: req.body.courseCode,
      courseName: req.body.courseName,
      credits: req.body.credits,
      instructor: req.body.instructor
    };
    const response = await mongodb.getDb().db().collection('courses').replaceOne({ _id: courseId }, course);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the course.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid course id to delete a course.');
    }
    const courseId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('courses').deleteOne({ _id: courseId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the course.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCourse,
  updateCourse,
  deleteCourse
};
