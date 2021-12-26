const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./models/task");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error);

app.get("/tasks", async (req, res) => {
  const Tasks = await Task.find();

  res.json(Tasks);
});

app.post("/task/new", async (req, res) => {
  const task = await new Task({
    taskName: req.body.taskName,
  });

  task.save();

  res.json(task);
});

app.delete("/task/delete/:id", async (req, res) => {
  const result = await Task.findByIdAndDelete(req.params.id);

  res.json({ result });
});

app.put("/task/update/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.completed = !task.completed;
  task.save();
  res.json(task);
});

app.listen(PORT, () => console.log(`Connecting on port ${PORT}...`));
