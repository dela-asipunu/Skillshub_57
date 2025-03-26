import { Route, Routes } from 'react-router'
import Login from './components/Login/Login'
import Navbar from './components/Navbar/Navbar'
import Landing from './Pages/Landing/Landing'
import { useState } from 'react'
import Signup from './components/SignUp/Signup'
import Dashboard from './components/Dashboard/Dashboard'
import Chat from './components/Chat/Chat'
import CourseDetail from './components/Details/Details'


function App() {
  

  return (
    <>
      
      <div className="app">
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home/:userId' element={<Landing />} />
          <Route path='/register' element={<Signup/>}/>
          <Route path='/dashboard/:userId' element={<Dashboard/>}/>
          <Route path='/chat/:receiverId' element={<Chat/>} />
          <Route path='/course/:id' element={<CourseDetail/>}/>
          
        </Routes>
      </div>


    </>
  )
}

export default App
