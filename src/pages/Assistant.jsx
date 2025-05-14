import { useState, useRef, useEffect } from 'react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Send, Mic, PaperclipIcon, Bot, User, ArrowDown, Info, ChevronRight } from 'lucide-react'

const Assistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hi there! I\'m your Trade Connect Assistant. How can I help you with your export needs today?',
      timestamp: new Date().toISOString()
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [connectionStatus, setConnectionStatus] = useState('untested') 

  const faqItems = [
    {
      id: 1,
      question: 'How do I add a new product for export?',
      answer: 'To add a new product, go to the Products section from the sidebar menu. Then click on the "Add Product" button located at the top right of the page. Fill in the product details form and save your changes.'
    },
    {
      id: 2,
      question: 'How can I contact other businesses?',
      answer: 'You can connect with other businesses by visiting their profile page and clicking on the "Connect" button. You can also use the messaging system to send inquiries directly about specific products.'
    },
    {
      id: 3,
      question: 'What documents do I need for export?',
      answer: 'The required documents typically include commercial invoice, packing list, certificate of origin, export licenses, and shipping documents. These can be uploaded in the Documents section of your account.'
    },
    {
      id: 4,
      question: 'How do international payment transactions work?',
      answer: 'Trade Connect provides secure payment options like Letter of Credit, Documentary Collection, and Direct Payment. After agreeing on terms, the payment process will follow international standards with proper documentation to protect both parties.'
    }
  ]

  useEffect(() => {
    const testBackendConnection = async () => {
      try {
        const response = await fetch('https://backend-tradeconnect-production.up.railway.app/test', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          console.log('Successfully connected to backend API');
          setConnectionStatus('connected');
        } else {
          console.error('Backend connection test failed');
          setConnectionStatus('error');
        }
      } catch (err) {
        console.error('Error testing backend connection:', err);
        setConnectionStatus('error');
      }
    };
    
    testBackendConnection();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: newMessage,
      timestamp: new Date().toISOString()
    }
    
    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setIsTyping(true)
    
    try {
      console.log('Sending request to /ask');
      if (!newMessage) {
        throw new Error('Message is required');
      }
      // Send message to backend API
      const response = await fetch('https://backend-tradeconnect-production.up.railway.app/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage }),
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      
      // Add AI response
      const aiMessage = {
        id: messages.length + 2,
        type: 'assistant',
        content: data.reply || 'Sorry, I received an empty response. Please try again.',
        timestamp: new Date().toISOString()
      }
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('Error fetching response:', err);
      
      let errorMsg = 'Sorry, I encountered an error connecting to the backend. Please make sure the Flask server is running.';
      
      if (err.message.includes('status: 500')) {
        errorMsg = 'The server encountered an internal error. This might be an issue with the Gemini API. Please check your API key and server logs.';
      } else if (err.message.includes('status: 400')) {
        errorMsg = 'The server could not process your request due to invalid data format.';
      }
      
      // Add error message as system message
      const errorMessage = {
        id: messages.length + 2,
        type: 'assistant',
        content: errorMsg,
        timestamp: new Date().toISOString(),
        isError: true
      }
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleFaq = (id) => {
    if (expandedFaq === id) {
      setExpandedFaq(null)
    } else {
      setExpandedFaq(id)
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Export Assistant</h1>
        <div className="flex items-center gap-2">
          {connectionStatus === 'connected' && (
            <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded-full flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              API Connected
            </span>
          )}
          {connectionStatus === 'error' && (
            <span className="text-sm px-2 py-1 bg-red-100 text-red-800 rounded-full flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
              API Connection Error
            </span>
          )}
          <Button variant="secondary" className="flex items-center gap-2">
            <Info size={18} />
            <span>Help</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Chat Section */}
        <div className="lg:col-span-2 flex flex-col bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-blue-50 border-b border-blue-100">
            <div className="flex items-center">
              <Bot size={20} className="text-blue-600 mr-2" />
              <h2 className="font-medium text-blue-800">Trade Connect Export Assistant</h2>
            </div>
            <p className="text-xs text-blue-600 mt-1">Powered by Google Gemini AI - Your expert in international trade</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {connectionStatus === 'error' && messages.length === 1 && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4">
                <p className="font-medium">Connection Error</p>
                <p className="text-sm mt-1">
                  Unable to connect to the backend API. 
                </p>
                <p className="text-sm mt-2">
                  <strong>Troubleshooting:</strong> Check that:
                  <ul className="list-disc pl-5 mt-1">
                    <li>Flask server is running with <code>flask run</code> or <code>python app.py</code></li>
                    <li>flask-cors is installed (<code>pip install flask-cors</code>)</li>
                    <li>The server is configured with CORS support</li>
                    <li>Check browser console for specific error messages</li>
                  </ul>
                </p>
              </div>
            )}
            
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[75%] rounded-lg p-3 ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : message.isError 
                        ? 'bg-red-50 text-red-800 border border-red-200'
                        : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {message.type === 'assistant' ? (
                      <Bot size={16} className="mr-1" />
                    ) : (
                      <User size={16} className="mr-1" />
                    )}
                    <span className="text-xs opacity-70">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[75%]">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about exports..."
                  className="w-full border border-gray-300 rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
                  rows={1}
                  style={{ minHeight: '42px', maxHeight: '120px' }}
                  disabled={isTyping || connectionStatus === 'error'}
                ></textarea>
                <button className="absolute right-3 bottom-3 text-gray-400 hover:text-gray-600">
                  <PaperclipIcon size={18} />
                </button>
              </div>
              <button 
                className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
                title="Voice input"
                disabled={isTyping || connectionStatus === 'error'}
              >
                <Mic size={20} />
              </button>
              <button 
                onClick={handleSendMessage}
                className={`p-2 rounded-full ${
                  isTyping || connectionStatus === 'error'
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
                disabled={isTyping || connectionStatus === 'error'}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="mb-4">
            <h3 className="font-medium text-gray-800 mb-1">Export FAQ</h3>
            <p className="text-sm text-gray-500">Quick answers to common export questions</p>
          </div>
          
          <div className="space-y-3">
            {faqItems.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-700">{item.question}</span>
                  <ChevronRight 
                    size={18} 
                    className={`text-gray-400 transition-transform ${
                      expandedFaq === item.id ? 'transform rotate-90' : ''
                    }`} 
                  />
                </button>
                
                {expandedFaq === item.id && (
                  <div className="px-3 pb-3 text-sm text-gray-600 border-t border-gray-100">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2 flex items-center">
              <Info size={16} className="mr-1" />
              Need Export Assistance?
            </h4>
            <p className="text-sm text-blue-700 mb-3">
              Looking for personalized export advice? Our international trade experts are ready to help.
            </p>
            <Button variant="primary" fullWidth>Contact Export Specialist</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Assistant
