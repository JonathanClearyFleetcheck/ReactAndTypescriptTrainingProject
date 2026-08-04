import type { Task } from "../types/task.ts";
import { TaskListItem } from "./taskListItem.tsx";

export function TaskList({ tasks, editTask, deleteTask }: { tasks: Task[]; editTask: (taskId: number, newTaskName: string) => void; deleteTask: (taskId: number) => void; }) {
  return (
    <div className="task-list">
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskListItem task={task} editTask={editTask} deleteTask={deleteTask} />
          </li>
        ))}
      </ul>
    </div>
  );
}
