import { useAuth } from '../../hooks/useAuth'
import { Menu, X, Bell, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-1 mr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none">
            <Bell size={20} />
          </button>
          
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700">
                {user?.accountType === 'supplier' ? 'S' : 'B'}
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-700">
                  Welcome, {user?.accountType === 'supplier' ? 'Supplier' : 'Buyer'}
                </div>
              </div>
              <ChevronDown size={16} className="text-gray-500" />
            </button>
            
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </a>
                <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </a>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header