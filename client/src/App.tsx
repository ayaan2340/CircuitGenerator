import axios, { type AxiosResponse } from 'axios'
import './index.css'
import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'system';
  timestamp: Date;
}

// Type declarations for CircuitJS1
declare global {
  interface Window {
    oncircuitjsloaded?: () => void;
    CircuitJS1?: any;
  }
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Welcome to the Circuit Generator! You can control the circuit simulator through this chat. Try commands like "start simulation", "stop simulation", "export circuit", or "get status".', sender: 'system', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [circuitSim, setCircuitSim] = useState<any>(null);
  const [isCircuitLoaded, setIsCircuitLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      // Wait for the circuit simulator to load
      if (iframe.contentWindow) {
        iframe.contentWindow.oncircuitjsloaded = function() {
          if (iframe.contentWindow?.CircuitJS1) {
            const sim = iframe.contentWindow.CircuitJS1;
            setCircuitSim(sim);
            setIsCircuitLoaded(true);
            
            // Set up callbacks
            sim.onupdate = () => {
              // Handle simulation updates
            };
            
            sim.ontimestep = () => {
              // Handle time step updates
            };
            
            sim.onanalyze = () => {
              // Handle circuit analysis
            };
            
            addMessage('Circuit simulator loaded and ready!', 'system');
          }
        };
      }
    };

    iframe.addEventListener('load', handleLoad);
    return () => iframe.removeEventListener('load', handleLoad);
  }, []);

  const addMessage = (text: string, sender: 'user' | 'system') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userInput = inputValue.trim();
    addMessage(userInput, 'user');
    setInputValue('');

    // Process commands
    await processCommand(userInput.toLowerCase());
  };

  const processCommand = async (command: string) => {
    if (!isCircuitLoaded) {
      addMessage('Circuit simulator is not loaded yet. Please wait.', 'system');
      return;
    }

    try {
      if (command.includes('start') && command.includes('simulation')) {
        circuitSim.setSimRunning(true);
        addMessage('Simulation started!', 'system');
      } else if (command.includes('stop') && command.includes('simulation')) {
        circuitSim.setSimRunning(false);
        addMessage('Simulation stopped!', 'system');
      } else if (command.includes('status')) {
        const isRunning = circuitSim.isRunning();
        const time = circuitSim.getTime();
        addMessage(`Status: ${isRunning ? 'Running' : 'Stopped'}, Time: ${time.toFixed(3)}s`, 'system');
      } else if (command.includes('export')) {
        const circuitData = circuitSim.exportCircuit();
        addMessage(`Circuit exported! Data length: ${circuitData.length} characters`, 'system');
      } else if (command.includes('time step')) {
        const timeStep = circuitSim.getTimeStep();
        const maxTimeStep = circuitSim.getMaxTimeStep();
        addMessage(`Current time step: ${timeStep}, Max time step: ${maxTimeStep}`, 'system');
      } else if (command.includes('elements')) {
        const elements = circuitSim.getElements();
        addMessage(`Circuit has ${elements.length} elements`, 'system');
      } else if (command.includes('svg')) {
        const svg = circuitSim.getCircuitAsSVG();
        addMessage(`Circuit exported as SVG! Data length: ${svg.length} characters`, 'system');
      } else if (command.includes('help')) {
        addMessage('Available commands: start simulation, stop simulation, status, export, time step, elements, svg, help', 'system');
      } else {
        addMessage('Unknown command. Type "help" for available commands.', 'system');
      }
    } catch (error) {
      addMessage(`Error: ${error}`, 'system');
    }
  };

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
            ref={iframeRef}
            src="/war/circuitjs.html?startCircuit=jsinterface.txt"
            className="w-full h-full border-0 block min-h-[400px]"
            title="Circuit Simulator"
          />
        </div>
        {/* Chat Box */}
        <div className="w-[350px] bg-[#23280b] rounded-lg flex flex-col h-full min-h-[400px] border border-accent">
          <div className="flex-1 overflow-y-auto p-4 space-y-2" id="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`text-sm ${message.sender === 'user' ? 'text-primary' : 'text-accent'}`}>
                <div className="font-semibold">{message.sender === 'user' ? 'You' : 'System'}</div>
                <div className="mt-1">{message.text}</div>
                <div className="text-xs opacity-60 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="p-2 border-t border-accent flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 rounded px-2 py-1 bg-background text-primary outline-none border border-accent"
              placeholder="Type your command..."
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
