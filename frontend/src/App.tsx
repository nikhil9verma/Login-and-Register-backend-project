
import Register from './views/Register'

import Login from './views/Login'
import './App.css'
import {Route,Routes} from "react-router-dom"
function App() {

  return (
    
      <div className='App'>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </div>
   
  )
}

export default App
