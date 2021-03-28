import React from 'react'

import TodoItem from './TodoItem'

const TodoList = ({ todoItems = [], onItemCheck, onItemDelete }) => {
  return (
    <ul>
      {todoItems.map(todoItem => (
        <TodoItem
          key={todoItem.id}
          item={todoItem}
          onCheck={onItemCheck}
          onDelete={onItemDelete}
        />
      ))}
    </ul>
  )
}

export default TodoList
