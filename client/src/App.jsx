import { useState } from 'react'
import { Home,Custumizer } from './Pages'
import Canvas from './canvas';
import './App.css'

function App() {
  

  return (
    <main className="app transition-all ease-in">
      
         <Home/>
         <Canvas/>
         <Custumizer/>
      
      
    </main>
  )
}

export default App
