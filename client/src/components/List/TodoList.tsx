import React from "react";
import TodoItem from "./TodoItem";
import Button from "../UI/button/Button";
import { useTodoStore } from "../../store/todo";

const TodoList: React.FC = () => {
  const [input, setInput] = React.useState("");

  /* -------- zustand -------- */
  const todos   = useTodoStore((s) => s.todos);
  const addTodo = useTodoStore((s) => s.addTodo);

  /* -------- helpers -------- */
  const handleAdd = () => {
    const text = input.trim();
    if (!text) return;
    addTodo(text);          // write to store
    setInput("");
  };

  /* -------- render -------- */
  return (
    <section className="space-y-6">
      {/* add form */}
      <div className="flex gap-3">
        <input
          className="flex-1 rounded-md border border-purple/40 bg-background px-3 py-2 text-sm text-white placeholder-white outline-none focus:ring-2 focus:ring-blue"
          placeholder="Add a new task…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <Button
          onClick={handleAdd}
          variant="primary"        >
          Add
        </Button>
      </div>

      {/* list */}
      <ul className="space-y-3">
        {todos.map((todo) => (
          <TodoItem key={todo.id} id={todo.id} />
        ))}

        {todos.length === 0 && (
          <li className="text-center text-sm text-purple/60">
            Nothing here yet. Add your first task!
          </li>
        )}
      </ul>
    </section>
  );
};

export default TodoList;
