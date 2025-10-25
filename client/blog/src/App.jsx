import React from 'react';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import Register  from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import NewPost from './pages/NewPost.jsx'
import ReadMore from './pages/ReadMore.jsx'
import UserManagement from './pages/UserManagement.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' exact  element={<Home/>}/>
        <Route path='/register'  element={<Register/>}/>
        <Route path='/login'  element={<Login/>}/>
        <Route path='/newblog' element={<NewPost/>}/>
        <Route path='/readmore/:id' element={<ReadMore/>}/>
        <Route path='/userblogs' element={<UserManagement />}/>
        <Route path='*' element={<h1>Page Not Found</h1>}/>
      </Routes>
      
    </>
  )
}

export default App
