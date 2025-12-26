import React, { useState } from 'react'
import Shop from './Page/Shop'
import { Route, Routes } from 'react-router-dom'
import ProductPage from './Page/ProductDetail'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/product/:id' element={<ProductPage />} />
      </Routes>
    </div>
  )
}

export default App
