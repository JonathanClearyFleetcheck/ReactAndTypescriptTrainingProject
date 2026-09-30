import type { Task } from "../types/task.ts";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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

  const handleSaveEdit = useHandleSaveEditCallback(taskName, inputRef, editTask, task, setIsEditing);

  const handleCancelEdit = useHandleCancelEditCallback(setTaskName, task, setIsEditing);

  const handleEdit = useHandleEditCallback(setIsEditing, setShouldFocus);

  const handleDelete = useHandleDeleteCallback(deleteTask, task);

  useFocusInputEffect(isEditing, shouldFocus, inputRef, setShouldFocus);

  const handleInputKeyDown = useHandleInputKeyDownCallback(
    handleSaveEdit,
    handleCancelEdit,
  );

  const handleInputChange = useHandleInputChangeCallback(setTaskName);

  const taskNameLength = useTaskNameLengthMemo(taskName);

  const isValid = useIsValidMemo(taskNameLength);

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

function useHandleDeleteCallback(deleteTask: (taskId: number) => void, task: Task) {
  return useCallback(() => {
    deleteTask(task.id);
  }, [deleteTask, task.id]);
}

function useHandleEditCallback(setIsEditing: Dispatch<SetStateAction<boolean>>, setShouldFocus: Dispatch<SetStateAction<boolean>>) {
  return useCallback(() => {
    setIsEditing(true);
    setShouldFocus(true);
  }, []);
}

function useHandleCancelEditCallback(setTaskName: Dispatch<SetStateAction<string>>, task: Task, setIsEditing: Dispatch<SetStateAction<boolean>>) {
  return useCallback(() => {
    setTaskName(task.name);
    setIsEditing(false);
  }, [task.name]);
}

function useHandleSaveEditCallback(taskName: string, inputRef: RefObject<HTMLInputElement | null>, editTask: (taskId: number, newTaskName: string) => void, task: Task, setIsEditing: Dispatch<SetStateAction<boolean>>) {
  return useCallback(() => {
    if (taskName.length > maxTaskNameLength ||
      taskName.length < minTaskNameLength) {
      inputRef.current?.focus();
      return;
    }

    editTask(task.id, taskName);
    setIsEditing(false);
  }, [editTask, task.id, taskName]);
}

function useFocusInputEffect(
  isEditing: boolean,
  shouldFocus: boolean,
  inputRef: RefObject<HTMLInputElement | null>,
  setShouldFocus: Dispatch<SetStateAction<boolean>>,
) {
  useEffect(() => {
    if (!isEditing || !shouldFocus) {
      return;
    }

    inputRef.current?.focus();
    setShouldFocus(false);
  }, [isEditing]);
}

function useHandleInputKeyDownCallback(
  handleSaveEdit: () => void,
  handleCancelEdit: () => void,
) {
  return useCallback(
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
}

function useHandleInputChangeCallback(
  setTaskName: Dispatch<SetStateAction<string>>,
) {
  return useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value.length > maxTaskNameLength ||
      e.target.value.length < minTaskNameLength
    ) {
      setTaskName(e.target.value.substring(0, maxTaskNameLength));
      return;
    }

    setTaskName(e.target.value);
  }, []);
}

function useTaskNameLengthMemo(taskName: string) {
  return useMemo(() => taskName.length, [taskName]);
}

function useIsValidMemo(taskNameLength: number) {
  return useMemo(
    () =>
      taskNameLength <= maxTaskNameLength &&
      taskNameLength >= minTaskNameLength,
    [taskNameLength],
  );
}
