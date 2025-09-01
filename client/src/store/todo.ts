import { create } from "zustand";
import { api } from "../lib/api";

/* API shape: { id:number; title:string; completed:boolean } */
export type Todo = { id: number; title: string; completed: boolean };

type TodoStore = {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  loadTodos: () => Promise<void>;
  addTodo: (text: string) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  /* alias for compatibility */
  removeTodo: (id: number) => Promise<void>;
};

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  loading: false,
  error: null,

  async loadTodos() {
    set({ loading: true, error: null });
    try {
      const data = await api<Todo[]>("/todos", { method: "GET" }, true);
      set({ todos: data });
    } catch (e) {
      set({ error: e instanceof Error ? e.message : "Failed to load todos" });
    } finally {
      set({ loading: false });
    }
  },

  async addTodo(text: string) {
    const title = text.trim();
    if (!title) return;
    const created = await api<Todo>(
      "/todos",
      { method: "POST", body: JSON.stringify({ title }) },
      true
    );
    set((s) => ({ todos: [created, ...s.todos] }));
  },

  async toggleTodo(id: number) {
    const current = get().todos.find((t) => t.id === id);
    if (!current) return;
    const updated = await api<Todo>(
      `/todos/${id}`,
      { method: "PATCH", body: JSON.stringify({ completed: !current.completed }) },
      true
    );
    set((s) => ({ todos: s.todos.map((t) => (t.id === id ? updated : t)) }));
  },

  async deleteTodo(id: number) {
    await api<void>(`/todos/${id}`, { method: "DELETE" }, true);
    set((s) => ({ todos: s.todos.filter((t) => t.id !== id) }));
  },

  removeTodo(id: number) {
    return get().deleteTodo(id);
  },
}));
