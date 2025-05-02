import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  FileText,
  Eye,
  HelpCircle,
  ThumbsUp
} from 'lucide-react'
import logo from '../../assets/images/logo.png'

const Sidebar = ({ isOpen }) => {
  const location = useLocation()
  
  const menuItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, name: 'Dashboard' },
    { path: '/product', icon: <Package size={20} />, name: 'Product' },
    { path: '/overview', icon: <Eye size={20} />, name: 'Overview' },
    { path: '/documents', icon: <FileText size={20} />, name: 'Documents' },
    { path: '/assistant', icon: <HelpCircle size={20} />, name: 'Assistant' },
    { path: '/recommendation', icon: <ThumbsUp size={20} />, name: 'Recommendation' }
  ]
  
  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className={`bg-white shadow-md ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
      <div className="p-4 flex justify-center">
        <Link to="/">
          <img src={logo} alt="Trade Connect Logo" className="h-10" />
        </Link>
      </div>
      
      <nav className="mt-6">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-6 py-3 hover:bg-blue-50 transition-colors duration-150 ${
                  isActive(item.path) ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
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