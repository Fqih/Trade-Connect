import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Download, Upload, File, FileText, FilePlus, Trash2, Search } from 'lucide-react'

const Documents = () => {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  
  const categories = [
    { id: 'all', name: 'All Documents' },
    { id: 'certificates', name: 'Certificates' },
    { id: 'contracts', name: 'Contracts' },
    { id: 'invoices', name: 'Invoices' },
    { id: 'reports', name: 'Reports' }
  ]
  
  const documents = [
    { 
      id: 1, 
      name: 'Business Registration Certificate', 
      category: 'certificates',
      date: '2024-04-15',
      size: '2.3 MB',
      type: 'PDF'
    },
    { 
      id: 2, 
      name: 'Product Specification Sheet', 
      category: 'reports',
      date: '2024-04-10',
      size: '1.5 MB',
      type: 'PDF'
    },
    { 
      id: 3, 
      name: 'Trade Agreement - PT Maju Bersama', 
      category: 'contracts',
      date: '2024-03-28',
      size: '3.1 MB',
      type: 'DOCX'
    },
    { 
      id: 4, 
      name: 'Invoice #INV-2024-0342', 
      category: 'invoices',
      date: '2024-03-21',
      size: '0.8 MB',
      type: 'PDF'
    },
    { 
      id: 5, 
      name: 'Product Quality Certificate', 
      category: 'certificates',
      date: '2024-03-15',
      size: '1.2 MB',
      type: 'PDF'
    },
    { 
      id: 6, 
      name: 'Monthly Sales Report - March 2024', 
      category: 'reports',
      date: '2024-04-02',
      size: '4.5 MB',
      type: 'XLSX'
    }
  ]
  
  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = activeCategory === 'all' || doc.category === activeCategory
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })
  
  const getDocumentIcon = (type) => {
    switch (type) {
      case 'PDF':
        return <FileText size={20} className="text-red-500" />
      case 'DOCX':
        return <File size={20} className="text-blue-500" />
      case 'XLSX':
        return <File size={20} className="text-green-500" />
      default:
        return <File size={20} className="text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Documents</h1>
        <Button variant="primary" className="flex items-center gap-2">
          <FilePlus size={18} />
          <span>Upload New</span>
        </Button>
      </div>
      
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="hidden md:flex items-center space-x-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 py-1 text-sm rounded-md ${
                activeCategory === category.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Mobile Categories */}
      <div className="md:hidden overflow-x-auto pb-2">
        <div className="flex space-x-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 py-1 text-sm rounded-md whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Documents Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredDocuments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDocuments.map((document) => (
                  <tr key={document.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getDocumentIcon(document.type)}
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{document.name}</div>
                          <div className="text-xs text-gray-500">{document.type} file</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        {document.category.charAt(0).toUpperCase() + document.category.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(document.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {document.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Download size={18} />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <FileText size={48} className="text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No documents found</h3>
            <p className="text-gray-500 mt-1">
              {searchQuery ? 'Try adjusting your search or filters' : 'Upload your first document to get started'}
            </p>
            {!searchQuery && (
              <Button variant="primary" className="mt-4 flex items-center gap-2">
                <Upload size={18} />
                <span>Upload Document</span>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Documents