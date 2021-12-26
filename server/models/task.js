const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TasksSchema = new Schema({
  taskName: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: String,
    default: Date.now(),
  },
});

const Task = mongoose.model("Task", TasksSchema);

module.exports = Task;
