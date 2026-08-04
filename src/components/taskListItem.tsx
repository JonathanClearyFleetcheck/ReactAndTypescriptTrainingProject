import type { Task } from "../types/task.ts";
import { useEffect, useRef, useState } from "react";

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
  let [shouldFocus, setShouldFocus] = useState(false);
  let [taskName, setTaskName] = useState(task.name);

  let inputRef = useRef<HTMLInputElement>(null);

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
    setShouldFocus(true);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  useEffect(() => {
    if (!isEditing || !shouldFocus) {
      return;
    }

    inputRef.current?.focus();
    setShouldFocus(false);
  }, [isEditing]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveEdit();
      return;
    }

    if (e.key === "Escape") {
      handleCancelEdit();
      return;
    }
  };

  return (
    <>
      {isEditing ? (
        <input
          type="text"
          className="task-name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          ref={inputRef}
          onBlur={handleSaveEdit}
          onKeyDown={handleInputKeyDown}
        />
      ) : (
        <span
          className="task-name bordered darken-on-hover"
          onClick={handleEdit}
        >
          {taskName}
        </span>
      )}
      <button className="delete button-col-1" onClick={handleDelete}>
        Delete
      </button>
    </>
  );
}
