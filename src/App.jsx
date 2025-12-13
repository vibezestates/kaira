
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'

import ThankYou from './components/ThankYou'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/thank-you" element={<ThankYou />} />
    </Routes>
  )
}
