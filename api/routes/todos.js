const router = require("express").Router();
const Todo = require("../models/Todo");

// get all Todos
router.get("/", async (req, res) => {
  console.log(req.user);
  try {
    const allTodos = await Todo.find({ userId: req.user.id });
    res.json({
      error: null,
      data: allTodos,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// add new Todo
router.post("/create", async (req, res) => {
  const todo = new Todo({
    userId: req.user.id + "",
    title: req.body.title,
  });
  console.log(todo);
  try {
    const savedTodo = await todo.save();
    res.json({
      error: null,
      data: savedTodo,
    });
    console.log(res);
  } catch (error) {
    res.status(400).json({ error });
  }
});
module.exports = router;
