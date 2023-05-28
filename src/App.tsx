import React from 'react'
import logo from './logo.svg'
import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainPage from './pages/MainPage'
import FormPage from './pages/FormPage'
import MoveShapePage from './pages/MoveShapePage'
import TestPage from './pages/TestPage'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/Form" element={<FormPage />}></Route>
        <Route path="/MoveShape" element={<MoveShapePage />}></Route>
        <Route path="/test" element={<TestPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
