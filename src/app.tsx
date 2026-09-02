import { createRoot } from "react-dom/client";
import { useCallback, useState, useMemo } from "react";
import type { Task } from "./types/task.ts";
import { TaskList } from "./components/taskList.tsx";
import { Header } from "./components/header.tsx";
import { Footer } from "./components/footer.tsx";
import { Pagination } from "./components/pagination.tsx";

export default function createReactApp(rootId: string) {
  const domNode = document.getElementById(rootId);
  if (!domNode) {
    throw new Error(`No element found with id "${rootId}"`);
  }
  const root = createRoot(domNode);
  root.render(<App />);
}

function App() {
  let [lastTaskId, setLastTaskId] = useState(1);
  let [tasks, setTasks] = useState<Task[]>([{ id: 1, name: "Sample Task" }]);
  let [currentPage, setCurrentPage] = useState(1);
  let [pageSize, setPageSize] = useState(10);
  let [searchQuery, setSearchQuery] = useState("");

  let filteredTasks = useMemo(
    () =>
      tasks.filter((task) => task.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [tasks, searchQuery],
  );

  const pageInfo = useMemo(
    () =>
      `Showing ${Math.min(pageSize * (currentPage - 1) + 1, filteredTasks.length)} to ${Math.min(filteredTasks.length, pageSize * currentPage)} of ${filteredTasks.length} tasks`,
    [pageSize, currentPage, filteredTasks.length],
  );

  const totalPages = useMemo(
    () => Math.ceil(filteredTasks.length / pageSize),
    [filteredTasks.length, pageSize],
  );

  const addTask = useCallback(
    (taskName: string) => {
      const newTask: Task = {
        id: lastTaskId + 1,
        name: taskName,
      };
      setTasks([...tasks, newTask]);
      setLastTaskId((value) => value + 1);
      if (currentPage < totalPages) {
        setCurrentPage(totalPages);
      }
      if (tasks.length > 0 && tasks.length % pageSize === 0) {
        setCurrentPage((oldValue) => oldValue + 1);
      }
    },
    [lastTaskId, tasks, currentPage, totalPages],
  );

  const deleteTask = useCallback(
    (taskId: number) => {
      setTasks([...tasks.filter((task) => task.id !== taskId)]);
    },
    [tasks],
  );

  const editTask = useCallback(
    (taskId: number, newTaskName: string) => {
      setTasks([
        ...tasks.map((task) =>
          task.id === taskId ? { ...task, name: newTaskName } : task,
        ),
      ]);
    },
    [tasks],
  );

  return (
    <div className="app-container">
      <Header>
        <button className="add" onClick={() => addTask("New Task")}>
          Add Task
        </button>
      </Header>
      <div className="body">
        <div className="search">
          Search:
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <TaskList
          tasks={tasks}
          filteredTasks={filteredTasks}
          currentPage={currentPage}
          pageSize={pageSize}
          editTask={editTask}
          deleteTask={deleteTask}
        />
        <div className="page-info">{pageInfo}</div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <Footer></Footer>
    </div>
  );
}
