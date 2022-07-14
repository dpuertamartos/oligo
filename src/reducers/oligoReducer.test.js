import oligoReducer from './noteReducer'
import deepFreeze from 'deep-freeze'

describe('oligoReducer', () => {
  test('returns new state with action NEW_NOTE', () => {
    const state = []
    const action = {
      type: 'NEW_OLIGO',
      data: {
        name: 'the new oligo',
        sequence: "ATTT"
      }
    }

    deepFreeze(state)
    const newState = oligoReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.data)
  })
})