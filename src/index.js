import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import oligoReducer from './reducers/oligoReducer'
import geneReducer from './reducers/geneReducer'
import plasmidReducer from './reducers/plasmidReducer'


const store = configureStore({
  reducer: {
    oligos: oligoReducer,
    genes: geneReducer,
    plasmids: plasmidReducer
  }
})

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)

