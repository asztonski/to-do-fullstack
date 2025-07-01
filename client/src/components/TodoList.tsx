import React from "react";
import TodoItem, { Todo } from "./TodoItem";

const TodoList: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [input, setInput] = React.useState("");

  /* ---------- helpers ---------- */

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    setTodos((t) => [...t, { id: Date.now(), text, done: false }]);
    setInput("");
  };

  const toggleTodo = (id: number) =>
    setTodos((t) =>
      t.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    );

  const deleteTodo = (id: number) =>
    setTodos((t) => t.filter((todo) => todo.id !== id));

  /* ---------- render ---------- */

  return (
    <section className="space-y-6">
      {/* add form */}
      <div className="flex gap-3">
        <input
          className="flex-1 rounded-md border border-purple/40 bg-background px-3 py-2 text-sm text-white placeholder-white outline-none focus:ring-2 focus:ring-blue"
          placeholder="Add a new task…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button
          onClick={addTodo}
          className="rounded-md bg-pink px-4 py-2 font-synth text-sm uppercase text-background shadow-[0_0_6px_#ff7edb] transition hover:bg-yellow hover:shadow-yellow"
        >
          Add
        </button>
      </div>

      {/* list */}
      <ul className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
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
