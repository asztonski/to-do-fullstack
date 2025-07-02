import ToDoInput from './ToDoInput'
import TodoItem from './TodoItem'
import { useTodoStore } from '../../store/todo'

export default function TodoList() {
  const todos = useTodoStore((s) => s.todos)

  return (
    <section className="space-y-6">
      <ToDoInput />

      <ul className="space-y-3">
        {todos.map((t) => (
          <TodoItem key={t.id} id={t.id} />
        ))}

        {todos.length === 0 && (
          <li className="text-center text-sm text-purple/60">
            Nothing here yet. Add your first task!
          </li>
        )}
      </ul>
    </section>
  )
}
