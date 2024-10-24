import { useState, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { AuthContextProvider } from './Context/AuthContext.ts'
import router from './Routers/routes'
import axios from 'axios'
import './App.css'

function App() {

  const [token, setToken_] = useState(localStorage.getItem("token"))  //state helps in updating the context
  const [user, setUser_] = useState(localStorage.getItem("user"))


  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
      localStorage.setItem('token',token);
      localStorage.setItem('user',user);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }, [token]);

  function setToken(newtoken){
    setToken_(newtoken)
  }

  function setUser(newuser){
    setUser_(newuser)
  }

  return (
    <AuthContextProvider value={{token, setToken, user, setUser}}>
      <RouterProvider router = {router}/>
    </AuthContextProvider>
  )
}

export default App
