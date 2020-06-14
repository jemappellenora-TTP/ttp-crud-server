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

module.exports = router;