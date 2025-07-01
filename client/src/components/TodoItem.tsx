import React from "react";
import '../index.css'; // Import global styles

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => (
  <li className="flex items-center justify-between rounded-md border border-purple/40 bg-background/60 px-4 py-2">
    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        className="size-4 accent-green"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span
        className={`text-sm ${
          todo.done ? "line-through text-purple/50" : "text-white"
        }`}
      >
        {todo.text}
      </span>
    </label>

    <button
      aria-label="Delete"
      onClick={() => onDelete(todo.id)}
      className="text-purple/60 transition hover:text-yellow"
    >
      ✕
    </button>
  </li>
);

export default TodoItem;
