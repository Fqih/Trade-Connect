import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  FileText,
  Eye,
  HelpCircle,
  ThumbsUp,
  X
} from 'lucide-react'
import logo from '../../assets/images/logo.png'
import logo_small from '../../assets/images/logo-small.png'
import { useEffect } from 'react'

const Sidebar = ({ isOpen, toggleSidebar }) => {
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

  // Prevent body scrolling when sidebar is open on mobile
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Close sidebar when navigating on mobile
  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Dark overlay for mobile that closes sidebar when clicked */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        />
      )}
      
      <div 
        className={`
          bg-white shadow-md z-30
          md:relative fixed h-full
          md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isOpen ? 'md:w-64' : 'md:w-20'} w-64
          transition-all duration-300 ease-in-out
        `}
      >
        <div className="p-4 flex justify-between items-center">
          <Link to="/">
            <img src={isOpen ? logo : logo_small} alt="Trade Connect Logo" className="h-10" />
          </Link>
          
          {/* Close button - only on mobile */}
          <button 
            className="md:hidden text-gray-500" 
            onClick={toggleSidebar}
          >
            <X size={20} />
          </button>
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
                  onClick={handleNavClick}
                >
                  <span className="mr-3">{item.icon}</span>
                  {(isOpen || window.innerWidth < 768) && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Sidebar
