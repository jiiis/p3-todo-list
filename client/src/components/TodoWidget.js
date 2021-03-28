import React, { useEffect, useState } from 'react'
import { isArray } from 'lodash'

import todoItemsApi from '../apis/todoItems'
import TodoList from './TodoList'
import TodoForm from './TodoForm'

const TodoWidget = () => {
  // States
  const [todoItems, setTodoItems] = useState([])
  const [status, setStatus] = useState('all')

  // Lifecycle events
  useEffect(() => {
    const fetchTodoItems = async () => {
      try {
        const { data } = await todoItemsApi.get('')

        setTodoItems(isArray(data) ? data : [])
      } catch (error) {
        // @todo Handle failed XHR request.
        console.error('Failed to fetch todo items!', error)
      }
    }

    fetchTodoItems()
  }, [])

  // Event handlers
  const handleTodoFromSubmit = async (description) => {
    let todoItem = {
      id: Math.floor(Math.random() * 10000),
      description,
      isCompleted: false
    }

    try {
      await todoItemsApi.post('', todoItem)

      setTodoItems([...todoItems, todoItem])
    } catch (error) {
      // @todo Handle failed XHR request.
      console.error('Failed to create todo item!', error)
    }
  }

  const handleStatusChange = (status) => {
    setStatus(status)
  }

  const handleTodoItemCheck = async (todoItemId) => {
    try {
      await todoItemsApi.patch(`/${todoItemId}`, { isCompleted: true })

      setTodoItems(todoItems.map(todoItem => {
        if (todoItem.id === todoItemId) {
          return { ...todoItem, isCompleted: true }
        }

        return todoItem
      }))
    } catch (error) {
      // @todo Handle failed XHR request.
      console.error('Failed to patch todo item!', error)
    }
  }

  const handleTodoItemDelete = async (todoItemId) => {
    try {
      await todoItemsApi.delete(`/${todoItemId}`)

      setTodoItems(todoItems.filter(todoItem => todoItem.id !== todoItemId))
    } catch (error) {
      // @todo Handle failed XHR request.
      console.error('Failed to delete todo item!', error)
    }
  }

  // Helpers
  const getFilteredTodoItems = () => {
    if (status === 'all') {
      return todoItems
    }

    const isCompleted = status === 'completed'

    return todoItems.filter(todoItem => todoItem.isCompleted === isCompleted)
  }

  return (
    <section>
      <TodoForm
        onSubmit={handleTodoFromSubmit}
        onStatusChange={handleStatusChange}
      />
      <TodoList
        todoItems={getFilteredTodoItems()}
        onItemCheck={handleTodoItemCheck}
        onItemDelete={handleTodoItemDelete}
      />
    </section>
  )
}

export default TodoWidget
