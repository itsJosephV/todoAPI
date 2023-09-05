const express = require("express");
const router = express.Router();

// controllers

const {
  createTodo,
  getTodoById,
  getTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} = require("../controllers/Todo");

router.param("todoId", getTodoById);

router.get("/todos/", getAllTodos);

router.get("/todo/:todoId", getTodo);

router.post("/todo/create/", createTodo);

router.put("/todo/:todoId/update", updateTodo);

router.delete("/todo/:todoId/delete", deleteTodo);

module.exports = router
