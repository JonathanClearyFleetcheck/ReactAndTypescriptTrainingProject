import { createRoot } from "react-dom/client";
import { useState } from "react";
import type { Task } from "./types/task.ts";
import { TaskList } from "./components/taskList.tsx";

export default function createReactApp(rootId: string) {
  const domNode = document.getElementById(rootId);
  if (!domNode) {
    throw new Error(`No element found with id "${rootId}"`);
  }
  const root = createRoot(domNode);
  root.render(<App />);
}

function App() {
  let [lastTaskId, setLastTaskId] = useState(1);
  let [tasks, setTasks] = useState<Task[]>([{ id: 1, name: "Sample Task" }]);

  const addTask = (taskName: string) => {
    const newTask: Task = {
      id: lastTaskId + 1,
      name: taskName,
    };
    setTasks([...tasks, newTask]);
    setLastTaskId((value) => value + 1);
  };

  const deleteTask = (taskId: number) => {
    setTasks([...tasks.filter((task) => task.id !== taskId)]);
  };

  const editTask = (taskId: number, newTaskName: string) => {
    setTasks([
      ...tasks.map((task) =>
        task.id === taskId ? { ...task, name: newTaskName } : task,
      ),
    ]);
  };

  return (
      <div className="app-container">
        <div className="header light-text">
          <div className="title">Task Manager</div>
          <div className="controls">
            <button className="add" onClick={() => addTask("New Task")}>
              Add Task
            </button>
          </div>
        </div>
        <div className="body">
          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          ) : (
            <h4>All tasks completed!</h4>
          )}
        </div>
        <div className="footer light-text">
          <p>Task Manager App - React + TypeScript</p>
        </div>
      </div>
  );
}
