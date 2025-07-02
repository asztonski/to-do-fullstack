import { useState } from 'react'
import { useTodoStore } from '../../store/todo'

export default function ToDoInput () {
  const [text, setText] = useState('')
  const addTodo = useTodoStore((s) => s.addTodo)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (text.trim()) {
          addTodo(text.trim())
          setText('')
        }
      }}
      className="flex gap-2"
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New task…"
        className="flex-1 rounded border p-2"
      />
      <button className="rounded bg-blue-600 px-4 py-2 text-white">
        Add
      </button>
    </form>
  )
}
