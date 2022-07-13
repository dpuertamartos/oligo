import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddOligoForm from './AddOligoForm'
import userEvent from '@testing-library/user-event'

test('<AddOligoForm /> updates parent state and calls onSubmit', async () => {
  const createOligo = jest.fn()
  const user = userEvent.setup()

  const container = render(<AddOligoForm createOligo={createOligo} />).container

  let input = container.querySelector('.enterOligoName')
  let input2 = container.querySelector('.enterOligoSequence')
  const sendButton = screen.getByText('save')
  
  await user.clear(input)
  await user.clear(input2)
  await user.type(input, 'testing a form...')
  await user.type(input2, "ATTTG")
  await user.click(sendButton)

  expect(createOligo.mock.calls).toHaveLength(1)
  expect(createOligo.mock.calls[0][0].name).toBe('TESTING A FORM...')
  expect(createOligo.mock.calls[0][0].sequence).toBe('ATTTG')
})