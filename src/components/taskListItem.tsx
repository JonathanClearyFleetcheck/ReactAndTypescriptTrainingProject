import type { Task } from "../types/task.ts";
import { useState } from "react";

export function TaskListItem({
  task,
  editTask,
  deleteTask,
}: {
  task: Task;
  editTask: (taskId: number, newTaskName: string) => void;
  deleteTask: (taskId: number) => void;
}) {
  let [isEditing, setIsEditing] = useState(false);
  let [taskName, setTaskName] = useState(task.name);

  const handleSaveEdit = () => {
    editTask(task.id, taskName);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setTaskName(task.name);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <>
      {isEditing ? (
        <input
          type="text"
          className="task-name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      ) : (
        <span className="task-name bordered">{taskName}</span>
      )}
      {isEditing ? (
        <>
          <button className="save button-col-1" onClick={handleSaveEdit}>
            Save
          </button>
          <button className="cancel button-col-2" onClick={handleCancelEdit}>
            Cancel
          </button>
        </>
      ) : (
        <button className="edit button-col-2" onClick={handleEdit}>
          Edit
        </button>
      )}
      <button className="delete button-col-3" onClick={handleDelete}>
        Delete
      </button>
    </>
  );
}
