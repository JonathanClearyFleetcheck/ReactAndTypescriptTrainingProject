import type { Task } from "../types/task.ts";
import { TaskListItem } from "./taskListItem.tsx";

export function TaskList({
  tasks,
  currentPage,
  pageSize,
  editTask,
  deleteTask,
}: {
  tasks: Task[];
  currentPage: number;
  pageSize: number;
  editTask: (taskId: number, newTaskName: string) => void;
  deleteTask: (taskId: number) => void;
}) {
  return (
    <div className="task-list">
      {tasks.length === 0 && (
        <h4 className="text-center full-width dark-text">
          All tasks completed!
        </h4>
      )}
      {tasks.length > 0 &&
        tasks
          .filter(
            (_, index) =>
              index >= (currentPage - 1) * pageSize &&
              index < currentPage * pageSize,
          )
          .map((task) => (
            <TaskListItem
              key={task.id}
              task={task}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          ))}
    </div>
  );
}
