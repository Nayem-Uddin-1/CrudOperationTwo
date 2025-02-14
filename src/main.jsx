import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { configureStore } from '@reduxjs/toolkit'

import DataSlice from "./DataSlice.jsx"
import { Provider } from 'react-redux'

//  const store = configureStore({
//   reducer: {},
// })


const store =configureStore({
   reducer: { 
users:DataSlice,

} ,})


 
 

 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider  store={store}>
      <App />
    </Provider>,
  </StrictMode>,



)
