import React from 'react'
import styled, { css } from 'styled-components'
import { AiOutlineCheck, AiOutlineDelete } from 'react-icons/ai'

const StyledTodoItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 36px;

  ${({ isCompleted }) => isCompleted && css`
    & > span {
      text-decoration: line-through;
    }
  `
  }
`

const TodoItem = ({ item = {}, onCheck, onDelete }) => {
  // Event handlers
  const handleCheckButtonClick = async () => {
    await onCheck(item.id)
  }

  const handleDeleteButtonClick = async () => {
    await onDelete(item.id)
  }

  if (!item) {
    console.error('Todo item is empty!')

    return null
  }

  return (
    <StyledTodoItem isCompleted={!!item.isCompleted}>
      <span>{item.description}</span>
      <button onClick={handleCheckButtonClick}>
        <AiOutlineCheck />
      </button>
      <button onClick={handleDeleteButtonClick}>
        <AiOutlineDelete />
      </button>
    </StyledTodoItem>
  )
}

export default TodoItem
