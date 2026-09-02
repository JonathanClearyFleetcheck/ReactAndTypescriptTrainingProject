import type { Task } from "../types/task.ts";
import { TaskListItem } from "./taskListItem.tsx";

export function TaskList({
  tasks,
  filteredTasks,
  currentPage,
  pageSize,
  editTask,
  deleteTask,
}: {
  tasks: Task[];
  filteredTasks: Task[];
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
      {filteredTasks.length === 0 && tasks.length > 0 && (
        <h4 className="text-center full-width dark-text">
          No tasks match your search.
        </h4>
      )}
      {tasks.length > 0 &&
        filteredTasks
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
