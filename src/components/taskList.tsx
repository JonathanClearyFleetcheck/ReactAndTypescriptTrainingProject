import type { Task } from "../types/task.ts";
import { TaskListItem } from "./taskListItem.tsx";

const pageSize = 10;
const currentPage = 1;

export function TaskList({
  tasks,
  editTask,
  deleteTask,
}: {
  tasks: Task[];
  editTask: (taskId: number, newTaskName: string) => void;
  deleteTask: (taskId: number) => void;
}) {
  return (
    <div className="task-list">
        {tasks
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
