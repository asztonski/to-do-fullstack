import Button from "../UI/button/Button";
import { useTodoStore } from "../../store/todo";

interface TodoItemProps {
  id: number;
}

export default function TodoItem({ id }: TodoItemProps) {
  const todo   = useTodoStore((s) => s.todos.find((t) => t.id === id));
  const toggle = useTodoStore((s) => s.toggleTodo);
  const remove = useTodoStore((s) => s.removeTodo);

  if (!todo) return null;

  return (
    <li className="flex items-center justify-between rounded-md border border-purple/40 bg-background/60 px-4 py-2">
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          className="size-4 accent-green"
          checked={todo.completed}
          onChange={() => toggle(id)}
        />
        <span
          className={`text-sm ${
            todo.completed ? "line-through text-purple/50" : "text-white"
          }`}
        >
          {todo.title}
        </span>
      </label>

      <Button
        variant="danger"
        aria-label="Delete"
        onClick={() => remove(id)}
        className="px-2 py-0"
      >
        <span>x</span>
      </Button>
    </li>
  );
}
