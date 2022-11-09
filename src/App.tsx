import React, { useEffect } from "react"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { getCats } from "./utils/apiService"
import Home from "./pages/Home"
import SingleCat from "./pages/SingleCat"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path=':id' element={<SingleCat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
