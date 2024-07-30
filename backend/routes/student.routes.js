const express = require("express");
const router = express.Router();
const Student = require("../models/student.model");

// Get All Students
router.get("/", (req, res) => {
  Student.find()
    .then((students) => res.json(students))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Add Student
router.post("/add", (req, res) => {
  const newStudent = new Student(req.body);
  newStudent
    .save()
    .then(() => res.json("Student added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get Student by ID
router.get("/:id", (req, res) => {
  Student.findById(req.params.id)
    .then((student) => res.json(student))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update Student
router.put("/update/:id", (req, res) => {
  Student.findById(req.params.id)
    .then((student) => {
      student.name = req.body.name;
      student.age = req.body.age;
      student.branch = req.body.branch;
      student.year = req.body.year;

      student
        .save()
        .then(() => res.json("Student updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete Student
router.delete("/:id", (req, res) => {
  Student.findByIdAndDelete(req.params.id)
    .then(() => res.json("Student deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
