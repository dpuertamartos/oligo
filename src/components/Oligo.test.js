import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Oligo from './Oligo'

test('renders content', () => {
  const oligo= {
    name: "oligo1",
    sequence: 'ATTT',
  }

  const {container} = render(<Oligo oligo={oligo} editOligo={()=>console.log("editing")} 
  deleteOligo={()=>console.log("deleting")}/>)
  screen.debug()
  
  const oligo1= container.querySelector('.oligo')
  
  expect(oligo1).toHaveTextContent('ATTT')
  expect(oligo1).toHaveTextContent('oligo1')
})

test('clicking the button calls event handler once', async () => {
    const oligo= {
        name: "oligo1",
        sequence: 'ATTT',
    }
  
    const mockHandler = jest.fn()
  
    render(<Oligo oligo={oligo} editOligo={()=>console.log("editing")} 
    deleteOligo={mockHandler}/>)
  
    const user = userEvent.setup()
    const button = screen.getByText('DELETE')
    await user.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(1)
  })