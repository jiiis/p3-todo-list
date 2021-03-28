import ReactDom from 'react-dom'
import renderer from 'react-test-renderer'
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react'

import TodoForm from './TodoForm'

let onStatusChangeSpy, onSubmitSpy, todoFormComponent

beforeEach(() => {
  onStatusChangeSpy = jest.fn()
  onSubmitSpy = jest.fn().mockResolvedValueOnce(null)

  todoFormComponent = <TodoForm
    status="all"
    onStatusChange={onStatusChangeSpy}
    onSubmit={onSubmitSpy}
  />
})

afterEach(cleanup)

test('renders in the DOM', () => {
  const div = document.createElement('div')

  ReactDom.render(todoFormComponent, div)
})

test('renders form', () => {
  const { getByTestId } = render(todoFormComponent)

  expect(getByTestId('todo-form')).toBeInTheDocument()
})

test('matches snapshot', () => {
  const tree = renderer.create(todoFormComponent).toJSON()

  expect(tree).toMatchSnapshot()
})

test('submits form', async () => {
  const { getByTestId } = render(todoFormComponent)
  const mockDescription = 'A mock todo item'

  fireEvent.change(getByTestId('todo-status-description'), { target: { value: mockDescription } })
  fireEvent.click(getByTestId('todo-form-button'))

  await waitFor(() => {
    expect(getByTestId('todo-status-description')).toHaveValue('')
  })

  expect(onSubmitSpy).toHaveBeenCalledWith(mockDescription)
})
