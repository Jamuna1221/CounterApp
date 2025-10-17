import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <h1>Wel;come toi Counter App</h1>
      <div className="card">
        <h2> count is {count} </h2>
        <button onClick={() => setCount((count) => count + 1)}>
          Increment 
        </button>
        <br></br>
        <br></br>
        <button onClick={() => setCount((count) => count - 1)}>
          Decrement 
        </button>
        <br></br>
        <br></br>
        <button onClick={() => setCount((count) => count - count)}>
          Reset  
        </button>
      </div>
    </>
  )
}

export default App
