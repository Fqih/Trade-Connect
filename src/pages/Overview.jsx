import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/ui/Button'
import { BarChart, LineChart, PieChart, Share2 } from 'lucide-react'

const Overview = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('summary')

  const stats = [
    { id: 1, label: 'Total Products', value: '28', change: '+12%', positive: true },
    { id: 2, label: 'Inquiries', value: '45', change: '+18%', positive: true },
    { id: 3, label: 'Connections', value: '12', change: '-3%', positive: false },
    { id: 4, label: 'Successful Trades', value: '8', change: '+4%', positive: true },
  ]

  const chartData = [
    { month: 'Jan', products: 12, inquiries: 20, connections: 5 },
    { month: 'Feb', products: 15, inquiries: 25, connections: 7 },
    { month: 'Mar', products: 18, inquiries: 30, connections: 10 },
    { month: 'Apr', products: 22, inquiries: 35, connections: 12 },
    { month: 'May', products: 25, inquiries: 40, connections: 10 },
    { month: 'Jun', products: 28, inquiries: 45, connections: 12 }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Business Overview</h1>
        <Button variant="secondary" className="flex items-center gap-2">
          <Share2 size={18} />
          <span>Share Report</span>
        </Button>
      </div>

      {/* Account Type Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
        <p className="text-blue-700">
          You are logged in as a <span className="font-semibold">{user?.accountType === 'supplier' ? 'Supplier' : 'Buyer'}</span>.
          {user?.accountType === 'supplier' 
            ? ' Your dashboard is optimized to showcase your products and handle inquiries.'
            : ' Your dashboard is optimized to discover products and make connections with suppliers.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between">
              <p className="text-gray-500">{stat.label}</p>
              <span className={`text-sm ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('summary')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'summary' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'products' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('connections')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'connections' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Connections
            </button>
          </div>
        </div>

        <div className="p-4">
          {activeTab === 'summary' && (
            <div>
              <h3 className="font-medium text-gray-700 mb-4">Activity Overview</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                <div className="text-center text-gray-500">
                  <LineChart size={48} className="mx-auto mb-2 opacity-40" />
                  <p>Performance Graph Visualization</p>
                  <p className="text-sm">Shows your account activity and performance over time</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <h3 className="font-medium text-gray-700 mb-4">Product Analytics</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                <div className="text-center text-gray-500">
                  <BarChart size={48} className="mx-auto mb-2 opacity-40" />
                  <p>Product Performance Metrics</p>
                  <p className="text-sm">Analyze product views, inquiries, and engagement</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'connections' && (
            <div>
              <h3 className="font-medium text-gray-700 mb-4">Connection Statistics</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                <div className="text-center text-gray-500">
                  <PieChart size={48} className="mx-auto mb-2 opacity-40" />
                  <p>Connection Distribution</p>
                  <p className="text-sm">Analyze your business connections and opportunities</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-medium text-gray-700 mb-4">Recent Activities</h3>
        <div className="space-y-3">
          <div className="flex items-start p-3 border-b border-gray-100">
            <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 mr-3"></div>
            <div>
              <p className="text-sm text-gray-800">New inquiry received for your product "Premium Rice"</p>
              <p className="text-xs text-gray-500 mt-1">Today, 10:30 AM</p>
            </div>
          </div>
          <div className="flex items-start p-3 border-b border-gray-100">
            <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3"></div>
            <div>
              <p className="text-sm text-gray-800">Connection request accepted by "PT Maju Jaya"</p>
              <p className="text-xs text-gray-500 mt-1">Yesterday, 4:15 PM</p>
            </div>
          </div>
          <div className="flex items-start p-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-purple-500 mr-3"></div>
            <div>
              <p className="text-sm text-gray-800">Your product "Organic Cassava" has been viewed 24 times</p>
              <p className="text-xs text-gray-500 mt-1">Apr 28, 2:45 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview