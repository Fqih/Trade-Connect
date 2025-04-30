import { useState, useRef, useEffect } from 'react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Send, Mic, PaperclipIcon, Bot, User, ArrowDown, Info, ChevronRight } from 'lucide-react'

const Assistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hi there! I\'m your Trade Connect Assistant. How can I help you today?',
      timestamp: new Date().toISOString()
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const [expandedFaq, setExpandedFaq] = useState(null)

  const faqItems = [
    {
      id: 1,
      question: ' ',
      answer: 'To add a new product, go to the Products section from the sidebar menu. Then click on the "Add Product" button located at the top right of the page. Fill in the product details form and save your changes.'
    },
    {
      id: 2,
      question: 'How can I contact other businesses?',
      answer: 'You can connect with other businesses by visiting their profile page and clicking on the "Connect" button. You can also use the messaging system to send inquiries directly about specific products.'
    },
    {
      id: 3,
      question: 'What documents do I need to upload?',
      answer: 'The required documents typically include business registration certificate, product certificates, and any relevant trade licenses. These can be uploaded in the Documents section of your account.'
    },
    {
      id: 4,
      question: 'How do payment transactions work?',
      answer: 'Trade Connect provides a secure payment system for transactions between connected businesses. After agreeing on terms, the buyer can initiate a payment which will be held in escrow until the product is delivered and verified.'
    }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
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
    
    // Simulate AI response after 1-2 seconds
    setTimeout(() => {
      let responseContent = 'Thank you for your message! I\'ll help you with that query about trade connections.'
      
      // Generate different responses based on keyword matching
      if (newMessage.toLowerCase().includes('product')) {
        responseContent = 'To manage your products, go to the Products section in the sidebar. There you can add, edit and track all your product listings.'
      } else if (newMessage.toLowerCase().includes('document') || newMessage.toLowerCase().includes('file')) {
        responseContent = 'You can upload and manage all your documents in the Documents section. We support various file types including PDF, DOCX, and image files.'
      } else if (newMessage.toLowerCase().includes('connect') || newMessage.toLowerCase().includes('buyer') || newMessage.toLowerCase().includes('supplier')) {
        responseContent = 'Trade Connect helps you find and connect with potential business partners. Check the Recommendations section for businesses that match your profile.'
      }
      
      const aiMessage = {
        id: messages.length + 2,
        type: 'assistant',
        content: responseContent,
        timestamp: new Date().toISOString()
      }
      
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, Math.random() * 1000 + 1000) // Random delay between 1-2 seconds
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
        <h1 className="text-2xl font-bold text-gray-800">AI Assistant</h1>
        <Button variant="secondary" className="flex items-center gap-2">
          <Info size={18} />
          <span>Help</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Chat Section */}
        <div className="lg:col-span-2 flex flex-col bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-blue-50 border-b border-blue-100">
            <div className="flex items-center">
              <Bot size={20} className="text-blue-600 mr-2" />
              <h2 className="font-medium text-blue-800">Trade Connect Assistant</h2>
            </div>
            <p className="text-xs text-blue-600 mt-1">Available 24/7 to help with your business needs</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[75%] rounded-lg p-3 ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
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
                  <p className="text-sm">{message.content}</p>
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
                  placeholder="Type your message..."
                  className="w-full border border-gray-300 rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
                  rows={1}
                  style={{ minHeight: '42px', maxHeight: '120px' }}
                ></textarea>
                <button className="absolute right-3 bottom-3 text-gray-400 hover:text-gray-600">
                  <PaperclipIcon size={18} />
                </button>
              </div>
              <button 
                className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
                title="Voice input"
              >
                <Mic size={20} />
              </button>
              <button 
                onClick={handleSendMessage}
                className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="mb-4">
            <h3 className="font-medium text-gray-800 mb-1">Frequently Asked Questions</h3>
            <p className="text-sm text-gray-500">Quick answers to common questions</p>
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
              Need More Help?
            </h4>
            <p className="text-sm text-blue-700 mb-3">
              Can't find what you're looking for? Our support team is ready to assist you.
            </p>
            <Button variant="primary" fullWidth>Contact Support</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Assistant