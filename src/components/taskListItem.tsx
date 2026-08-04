import type { Task } from "../types/task.ts";
import { useEffect, useRef, useState } from "react";

const maxTaskNameLength = 35;
const minTaskNameLength = 1;

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
  let [isValid, setIsValid] = useState(true);

  let inputRef = useRef<HTMLInputElement>(null);

  const handleSaveEdit = () => {
    if (taskName.length > maxTaskNameLength || taskName.length < minTaskNameLength) {
      setIsValid(false);
      inputRef.current?.focus();
      return;
    }

    setIsValid(true);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > maxTaskNameLength || e.target.value.length < minTaskNameLength) {
      setIsValid(false);
      setTaskName(e.target.value.substring(0, maxTaskNameLength));
      return;
    }

    setIsValid(true);
    setTaskName(e.target.value);
  };

  return (
    <>
      {isEditing ? (
        <div className="relative-container">
          <input
            type="text"
            className={isValid ? "task-name" : "task-name invalid"}
            value={taskName}
            onChange={handleInputChange}
            ref={inputRef}
            onBlur={handleSaveEdit}
            onKeyDown={handleInputKeyDown}
          />
          <span
            className={
              isValid ? "task-name-length" : "task-name-length invalid"
            }
          >
            {taskName.length}/{maxTaskNameLength}
          </span>
        </div>
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
