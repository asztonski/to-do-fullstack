import Button from "../components/UI/button/Button";
import { useTodoStore } from "../store/todo";
import { usePageStore } from "../store/page";

export default function History() {
  const completedTodos = useTodoStore((s) =>
    s.todos.filter((t) => t.completed)
  );
  const removeTodo = useTodoStore((s) => s.removeTodo);
  const setPage = usePageStore((s) => s.setPage);

  if (completedTodos.length === 0) {
    return (
      <div className="flex-1 flex-col items-center justify-center gap-4">
        <p className="text-lg text-purple-400">No completed tasks yet.</p>
        <Button variant="primary" onClick={() => setPage("dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Completed Tasks</h1>
        <Button
          variant="secondary"
          onClick={() => setPage("dashboard")}
          className="px-4 py-1.5"
        >
          Dashboard
        </Button>
      </header>

      <ul className="space-y-3">
        {completedTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between rounded-md border border-purple/40 bg-background/60 px-4 py-2"
          >
            <span className="line-through text-purple/60">{todo.text}</span>
            <Button
              variant="danger"
              aria-label="Delete permanently"
              onClick={() => removeTodo(todo.id)}
              className="px-2 py-0"
            >
              ✕
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
