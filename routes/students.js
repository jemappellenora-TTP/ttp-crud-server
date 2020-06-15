var express = require("express");
var router = express.Router();
const { Campus, Student } = require("../database/models");


router.get("/", async (req, res, next) => {
  try {
    const students = await Student.findAll({ include: Campus });
    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const student = await Students.findByPk(id, { include:Campus });
      res.status(200).json(student);
    } catch (err) {
      next(err);
    }
  });
  
router.post("/", async (req, res, next) => {
    const {firstName,lastName,email,gpa,campusId } = req.body;
    const StudentObj = {
        firstName,
        lastName,
        email,
        gpa,
        campusId
    };
    try {
      const newStudent = await Student.create(StudentObj);
      res.status(201).send(newStudent);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;