const Todo = require("../models/Todo.js");

//todo ADD CATCH ERRORS

exports.getTodoById = (req, res, next, todoId) => {
  //* todoId is coming from the router.param
  //* .findById() method will find the todo which has id == todoId

  Todo.findById(todoId).then((todo) => {
    if (!todo) {
      return res.status(404).json({
        error: "Todo not found",
      });
    }
    //* store that todo in req.todo so that other functions can use it
    req.todo = todo;
    //* Because this is a middleware we have to call the next()
    //* which will pass the control to the next function in the middleware stack
    next();
  });
  // .catch((err) => {
  //   return res.status(400).json({
  //     error: "Something went wrong in finding the todo",
  //   });
  // });
};

exports.getAllTodos = (_, res) => {
  Todo.find()
    .sort("-createdAt")
    .then((todos) => {
      if (!todos) {
        return res.status(400).json({
          error: "Something went wrong",
        });
      }
      res.json(todos);
    });
  // .catch((err) => {
  //   return res.status(400).json({
  //     error: "something went went wrong", err
  //   })
  // })
};

exports.getTodo = (req, res) => {
  return res.json(req.todo);
};

exports.createTodo = (req, res) => {
  const todo = new Todo(req.body);

  todo.save().then((task) => {
    res.json({ task });
  });
  // .catch((error) => {
  //   return res.status(400).json({
  //     error: "something went wrong", error
  //   })
  // })
};

exports.updateTodo = (req, res) => {
  const todo = req.todo;
  todo.task = req.body.task;

  todo.save().then((task) => {
    res.json(task);
  });
  // .catch((error) => {
  //   return res.status(400).json({
  //     error: "Something went wrong while updating the todo",
  //   });
  // });
};

exports.updateTodos = async (req, res) => {
  try {
    const updatedTodos = req.body.updatedTodos; // Assuming the client sends an array of todos with updated positions

    // Assuming updatedTodos is an array of todos with updated positions
    // Iterate through the updatedTodos and update the positions in the database
    for (const updatedTodo of updatedTodos) {
      const todoId = updatedTodo.id; // Assuming each updatedTodo has an 'id' field

      // Find the todo by its ID and update its position
      await Todo.findByIdAndUpdate(todoId, { position: updatedTodo.position });
    }

    // Send a success response
    res.json({ message: 'Todo positions updated successfully' });
  } catch (error) {
    // Handle errors and send an error response if necessary
    console.error('Error updating todo positions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.deleteTodo = (req, res) => {
  const todo = req.todo;
  todo.deleteOne().then((task) => {
    res.json({
      task_delete: task,
      message: "Todo deleted successfully",
    });
  });
};
