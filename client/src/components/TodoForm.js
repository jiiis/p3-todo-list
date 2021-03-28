import React, { useState } from 'react'

const TodoForm = ({ status, onStatusChange, onSubmit }) => {
  // States
  const [description, setDescription] = useState('')

  // Event handlers
  const handleDescriptionFieldChange = (event) => {
    setDescription(event.target.value)
  }

  const handleStatusFieldChange = (event) => {
    onStatusChange(event.target.value)
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()

    if (!isDescriptionValid()) {
      return
    }

    await onSubmit(description.trim())

    setDescription('')
  }

  // Helpers
  const isDescriptionValid = () => {
    return !/^\s*$/.test(description)
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="todo-description-field">Create todo item</label>
        <input
          id="todo-description-field"
          type="text"
          name="description"
          value={description}
          onChange={handleDescriptionFieldChange}
        />
        <button>Add</button>
      </form>
      <div>
        <label htmlFor="todo-status-select">Select status</label>
        <select
          id="todo-status-select"
          name="status"
          value={status}
          onChange={handleStatusFieldChange}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </div>
  )
}

export default TodoForm
