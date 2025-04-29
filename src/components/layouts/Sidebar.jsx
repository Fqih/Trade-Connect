// src/components/layout/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, FileText, FileBarChart, MessageSquareText, ThumbsUp } from 'lucide-react'
import logo from '../../assets/images/logo.svg'

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation()
  
  const menuItems = [
    {
      path: '/',
      name: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      path: '/product',
      name: 'Product',
      icon: <Package className="w-5 h-5" />
    },
    {
      path: '/overview',
      name: 'Overview',
      icon: <FileBarChart className="w-5 h-5" />
    },
    {
      path: '/documents',
      name: 'Documents',
      icon: <FileText className="w-5 h-5" />
    },
    {
      path: '/assistant',
      name: 'Assistant',
      icon: <MessageSquareText className="w-5 h-5" />
    },
    {
      path: '/recommendation',
      name: 'Recommendation',
      icon: <ThumbsUp className="w-5 h-5" />
    }
  ]

  return (
    <div className={`bg-white h-full shadow-md ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
      <div className="flex items-center justify-center p-4 border-b">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Trade Connect Logo" className="h-10" />
          {isOpen && <span className="ml-2 font-bold text-lg text-gray-800">Trade Connect</span>}
        </Link>
      </div>
      
      <nav className="mt-6">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className="mb-2">
              <Link
                to={item.path}
                className={`flex items-center py-3 px-4 ${location.pathname === item.path 
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <span className="mr-4">{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar