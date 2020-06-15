const Sequelize = require("sequelize");
const db = require("../db");

const Student = db.define("student", {
  firstName: { type: Sequelize.STRING, allowNull: false },
  lastName: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, validate: {isEmail: true} },
  gpa: { type: Sequelize.FLOAT, validate:{isNumeric: true, min:0, max:4}},
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRRWAjTO9sDIgksF8zbkTZ7rjZqqwJmYqKEJhcemmfYkwFn3kkz&usqp=CAU",
  },
});

module.exports = Student;
