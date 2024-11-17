const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Obtener todas las tareas
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Crear nueva tarea
router.post('/', async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

// Actualizar una tarea
router.put('/:id', async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});

// Eliminar una tarea
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Tarea eliminada" });
});

module.exports = router;
