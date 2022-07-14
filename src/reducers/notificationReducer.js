import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    appendNotification(state, action) {
        return [action.payload[0],action.payload[1]]
    },
    deleteNotification(state, action) {
        return null
    }
  },
})

export const { appendNotification, deleteNotification } = notificationSlice.actions


export const createNotification = content => {
    return dispatch => {
      dispatch(appendNotification(content))
      setTimeout(() => {
        dispatch(deleteNotification())
      }, 5000)
    }
}

export default notificationSlice.reducer