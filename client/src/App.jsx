import React from 'react'
import HomeScreen from './pages/HomeScreen'
import {Toaster} from "react-hot-toast"

const App = () => {
  return (
    <div> 
      <HomeScreen/>
      <Toaster/>
    </div>
  )
}

export default App