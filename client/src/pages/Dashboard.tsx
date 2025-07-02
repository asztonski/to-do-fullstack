import TodoList from "../components/List/TodoList";
import Button    from "../components/UI/button/Button";
import { usePageStore } from "../store/page";

export default function Dashboard() {
  const dashboardMode = usePageStore((s) => s.dashboardMode);
  const setPage       = usePageStore((s) => s.setPage);

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
    <div className="flex max-w-xl space-y-8 p-6">
      <h1 className="text-2xl font-semibold">My Tasks</h1>
      <TodoList />
    </div>
  );
}
