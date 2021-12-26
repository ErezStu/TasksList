import { useEffect, useState } from "react";
const DB_URL = "http://localhost:5000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    GetTasksHandler();
  }, []);

  const GetTasksHandler = () => {
    fetch(DB_URL + "/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error: ", err));
  };

  const completedTaskHandler = async (id) => {
    const data = await fetch(DB_URL + "/task/update/" + id, {
      method: "PUT",
    }).then((res) => res.json());
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task._id === data._id) {
          task.completed = data.completed;
        }
        return task;
      })
    );
  };

  const addTaskHandler = async () => {
    const data = await fetch(DB_URL + "/task/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskName: newTask,
      }),
    }).then((res) => res.json());

    setTasks([...tasks, data]);

    setPopupActive(false);
    setNewTask("");
  };

  const deleteTaskHandler = async (id) => {
    const data = await fetch(DB_URL + "/task/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setTasks((tasks) => tasks.filter((task) => task._id !== data.result._id));
  };

  return (
    <div className="App">
      <h1>Your tasks</h1>

      <div className="tasks">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              className={"task" + (task.completed ? " is-complete" : "")}
              key={task._id}
              onClick={() => completedTaskHandler(task._id)}
            >
              <div className="checkbox"></div>

              <div className="taskName">{task.taskName}</div>

              <div
                className="delete-task"
                onClick={() => deleteTaskHandler(task._id)}
              >
                x
              </div>
            </div>
          ))
        ) : (
          <p>You currently have no tasks</p>
        )}
      </div>

      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>

      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>
            X
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-task-input"
              onChange={(e) => setNewTask(e.target.value)}
              value={newTask}
            />
            <div className="button" onClick={addTaskHandler}>
              Create A New Task
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
