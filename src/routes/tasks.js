const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

// Obtener todas las tareas
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.log(error);
  }
});

// Crear nueva tarea
router.post("/", async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    console.log(error);
  }
});

// Actualizar una tarea
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTask);
  } catch (error) {
    console.log(error);
  }
});

// Eliminar una tarea
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Tarea no eliminada" });
  }
});

module.exports = router;
