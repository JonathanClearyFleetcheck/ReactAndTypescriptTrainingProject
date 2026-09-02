import type { Task } from "../types/task.ts";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const maxTaskNameLength = 35;
const minTaskNameLength = 1;

export function TaskListItem({
  task,
  index,
  editTask,
  deleteTask,
}: {
  task: Task;
  index: number;
  editTask: (taskId: number, newTaskName: string) => void;
  deleteTask: (taskId: number) => void;
}) {
  let [isEditing, setIsEditing] = useState(false);
  let [shouldFocus, setShouldFocus] = useState(false);
  let [taskName, setTaskName] = useState(task.name);

  let inputRef = useRef<HTMLInputElement>(null);

  const handleSaveEdit = useCallback(() => {
    if (
      taskName.length > maxTaskNameLength ||
      taskName.length < minTaskNameLength
    ) {
      inputRef.current?.focus();
      return;
    }

    editTask(task.id, taskName);
    setIsEditing(false);
  }, [editTask, task.id, taskName]);

  const handleCancelEdit = useCallback(() => {
    setTaskName(task.name);
    setIsEditing(false);
  }, [task.name]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setShouldFocus(true);
  }, []);

  const handleDelete = useCallback(() => {
    deleteTask(task.id);
  }, [deleteTask, task.id]);

  useEffect(() => {
    if (!isEditing || !shouldFocus) {
      return;
    }

    inputRef.current?.focus();
    setShouldFocus(false);
  }, [isEditing]);

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSaveEdit();
        return;
      }

      if (e.key === "Escape") {
        handleCancelEdit();
        return;
      }
    },
    [handleSaveEdit, handleCancelEdit],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (
        e.target.value.length > maxTaskNameLength ||
        e.target.value.length < minTaskNameLength
      ) {
        setTaskName(e.target.value.substring(0, maxTaskNameLength));
        return;
      }

      setTaskName(e.target.value);
    },
    [],
  );

  let taskNameLength = useMemo(() => taskName.length, [taskName]);

  let isValid = useMemo(
    () =>
      taskNameLength <= maxTaskNameLength &&
      taskNameLength >= minTaskNameLength,
    [taskNameLength],
  );

  return (
    <div className="task-list-item">
      <span>{index}.</span>
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
            {taskNameLength}/{maxTaskNameLength}
          </span>
        </div>
      ) : (
        <span
          className="task-name relative-container bordered darken-on-hover"
          onClick={handleEdit}
        >
          {taskName}
          <span
            className={
              isValid ? "task-name-length" : "task-name-length invalid"
            }
          >
            {taskNameLength}/{maxTaskNameLength}
          </span>
        </span>
      )}
      <button className="delete button-col-1" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
