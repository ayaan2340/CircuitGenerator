import axios, { type AxiosResponse } from 'axios'
import './index.css'
import { useState } from 'react'

function App() {
  const [displayName, setDisplayName] = useState<string>("");
  
  return (
    <div className="h-full w-full flex flex-col bg-background p-6">
      <div className="flex justify-center flex-col items-center pb-2">
        <h1 className="text-2xl font-bold text-accent">Circuit Generator</h1>
        <div className="flex flex-col items-center">
          <p className="text-sm text-accent">
            This is a tool to generate circuits.
          </p>
        </div>
      </div>
      {/* Main content: side by side */}
      <div className="flex-1 flex flex-row gap-4 min-h-0">
        {/* Circuit Simulator */}
        <div className="flex-1 min-w-0 h-full">
          <iframe 
            src="/war/circuitjs.html"
            className="w-full h-full border-0 block min-h-[400px]"
            title="Circuit Simulator"
          />
        </div>
        {/* Chat Box */}
        <div className="w-[350px] bg-[#23280b] rounded-lg flex flex-col h-full min-h-[400px] border border-accent">
          <div className="flex-1 overflow-y-auto p-4 space-y-2" id="chat-messages">
            {/* Example messages, replace with state later */}
            <div className="text-xs text-accent">Welcome to the chat!</div>
          </div>
          <form className="p-2 border-t border-accent flex items-center gap-2">
            <input
              type="text"
              className="flex-1 rounded px-2 py-1 bg-background text-primary outline-none border border-accent"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="bg-accent text-background px-3 py-1 rounded font-semibold hover:opacity-90 transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
