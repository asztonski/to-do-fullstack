import { useEffect } from "react";
import TodoList from "../components/List/TodoList";
import Button from "../components/UI/button/Button";
import { usePageStore } from "../store/page";
import { useTodoStore } from "../store/todo";

export default function Dashboard() {
  const dashboardMode = usePageStore((s) => s.dashboardMode);
  const setPage       = usePageStore((s) => s.setPage);

  const loadTodos = useTodoStore((s) => s.loadTodos);
  const loading   = useTodoStore((s) => s.loading);
  const error     = useTodoStore((s) => s.error);

  useEffect(() => {
    if (dashboardMode === "user") loadTodos();
  }, [dashboardMode, loadTodos]);

  if (dashboardMode === "guest") {
    return (
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-semibold">Todo List</h1>
        <p className="text-sm text-purple-400">
          Sign in to save your tasks across devices.
        </p>
        <Button variant="primary" onClick={() => setPage("login")}>
          Log in
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-xl space-y-4 p-6">
      <h1 className="text-2xl text-center font-semibold">My Tasks</h1>
      {loading && <p className="text-sm opacity-70">Loading…</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
      <TodoList />
    </div>
  );
}
