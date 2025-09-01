import { useCallback, useEffect, useState } from "react";
import { api } from "../lib/api";

export type Todo = { id: number; title: string; completed: boolean };

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api<Todo[]>("/todos", { method: "GET" }, true);
      setTodos(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load todos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = useCallback(async (title: string) => {
    const created = await api<Todo>(
      "/todos",
      { method: "POST", body: JSON.stringify({ title }) },
      true
    );
    setTodos((prev) => [created, ...prev]);
  }, []);

  const toggleTodo = useCallback(async (id: number, completed: boolean) => {
    const updated = await api<Todo>(
      `/todos/${id}`,
      { method: "PATCH", body: JSON.stringify({ completed }) },
      true
    );
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }, []);

  const deleteTodo = useCallback(async (id: number) => {
    await api<void>(`/todos/${id}`, { method: "DELETE" }, true);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { todos, loading, error, refetch: fetchTodos, addTodo, toggleTodo, deleteTodo };
}
