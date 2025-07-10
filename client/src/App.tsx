import axios, { type AxiosResponse } from 'axios'
import './App.css'
import { useState } from 'react'

function App() {
  const [displayName, setDisplayName] = useState<string>("");
  
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px', borderBottom: '1px solid #ccc', backgroundColor: '#f5f5f5', flexShrink: 0 }}>
        <h1>Circuit Generator</h1>
        {displayName && <p>{displayName}</p>}
        <button 
          onClick={() => {
            axios.get(`${import.meta.env.VITE_SERVER_URL}/api/testing`).then((res: AxiosResponse<string>) => {
              setDisplayName(res.data);
            }) 
          }}
          style={{ padding: '10px 20px', marginRight: '10px' }}
        >
          Test API Connection
        </button>
      </div>
      
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <iframe 
          src="/war/circuitjs.html"
          style={{ 
            width: '100%', 
            height: '100%', 
            border: 'none',
            display: 'block'
          }}
          title="Circuit Simulator"
        />
      </div>
    </div>
  )
}

export default App
