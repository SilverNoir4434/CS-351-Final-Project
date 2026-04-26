import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'

function App() {

  return (
      <Router>
          <div className={"content"}>
              <Routes>
                  <Route path={"/"} element={<Navigate to={"/login"}/>}/>
                  <Route path={"/login"} element={<Login />}/>
                  <Route path={"/dashboard"} element={<Dashboard />} />
              </Routes>
          </div>
      </Router>
  )
}

export default App
