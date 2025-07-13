import axios, { type AxiosResponse } from 'axios'
import './index.css'
import { useState } from 'react'

function App() {
  const [displayName, setDisplayName] = useState<string>("");
  
  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-5 border-b border-gray-300 bg-gray-100">
        <h1 className="text-2xl font-bold">Circuit Generator</h1>
        {displayName && <p>{displayName}</p>}
        <button 
          onClick={() => {
            axios.get(`${import.meta.env.VITE_SERVER_URL}/api/testing`).then((res: AxiosResponse<string>) => {
              setDisplayName(res.data);
            }) 
          }}
          className="px-5 py-2 mr-2 rounded border border-transparent bg-gray-900 text-white hover:border-indigo-500 transition-colors"
        >
          Test API Connection
        </button>
      </div>
      
      <div className="flex-1">
        <iframe 
          src="/war/circuitjs.html"
          className="w-full h-full border-0 block"
          title="Circuit Simulator"
        />
      </div>
    </div>
  )
}

export default App
