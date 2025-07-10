import axios, { type AxiosResponse } from 'axios'
import './App.css'
import { useState } from 'react'

function App() {
  const [displayName, setDisplayName] = useState<string>("");
  return (
    <div>
      <div>
          <iframe id="circuitFrame" 
                  src="https://www.falstad.com/circuit/circuitjs.html" 
                  width="800" 
                  height="500"
                  title="Circuit Simulator">
          </iframe>
      </div>
      <div>
        <h1>{displayName}</h1>
      </div>
      <button onClick={() => {
        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/testing`).then((res: AxiosResponse<string>) => {
          setDisplayName(res.data);
        }) 
      }}>Add component</button>
  </div>
  )
}

export default App
