import { useMemo } from "react";
import type { Task } from "../types/task.ts";
import { TaskListItem } from "./taskListItem.tsx";

export function TaskList({
  tasks,
  filteredTasks,
  currentPage,
  pageStart,
  pageEnd,
  totalPages,
  pageSize,
  editTask,
  deleteTask,
}: {
  tasks: Task[];
  filteredTasks: Task[];
  currentPage: number;
  pageStart: number;
  pageEnd: number;
  totalPages: number;
  pageSize: number;
  editTask: (taskId: number, newTaskName: string) => void;
  deleteTask: (taskId: number) => void;
}) {
  if (tasks.length === 0) {
    return (
      <TaskListContainer>
        <TaskListEmptyMessage message="All tasks completed!" />
      </TaskListContainer>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <TaskListContainer>
        <TaskListEmptyMessage message="No tasks match your search." />
      </TaskListContainer>
    );
  }

  let pagedTasks = usePagedTasks(filteredTasks, currentPage, pageSize);

  return (
    <TaskListContainer>
      {pagedTasks.map((task, index) => (
        <TaskListItem
          key={task.id}
          index={pageStart + index}
          task={task}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      ))}
    </TaskListContainer>
  );
}

function TaskListContainer({ children }: { children: React.ReactNode }) {
  return <div className="task-list">{children}</div>;
}

function TaskListEmptyMessage({ message }: { message: string }) {
  return <h4 className="text-center full-width dark-text">{message}</h4>;
}

function usePagedTasks(
  filteredTasks: Task[],
  currentPage: number,
  pageSize: number,
) {
  return useMemo(() => {
    return filteredTasks.filter(
      (_, index) =>
        index >= (currentPage - 1) * pageSize && index < currentPage * pageSize,
    );
  }, [filteredTasks, currentPage, pageSize]);
}
