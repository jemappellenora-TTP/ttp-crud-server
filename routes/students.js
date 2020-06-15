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
      const student = await Student.findByPk(id, { include:Campus });
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
  
  //route to edit students
  //api/students/:id
  router.put("/:id", async (req, res, next) => {
    const { id } = req.params;
    const {firstName,lastName,email,gpa,campusId } = req.body;
    const updatedStudent= {
        firstName,
        lastName,
        email,
        gpa,
        campusId
    };
    try {
      const student = await Student.findByPk(id);
      await student.set(updatedStudent);
      const updatedInfo = await student.save();
      res.status(201).send(updatedInfo);
    } catch (err) {
      next(err);
    }
  });
  
  // Route to handle removing 
  // /api/students/:id
  router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const student = await Student.findByPk(id);
      await student.destroy();
      // send a success message to the client
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  });
  

module.exports = router;