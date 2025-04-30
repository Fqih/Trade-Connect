// Base API URL - would be replaced with your actual API endpoint in production
const API_URL = import.meta.env.VITE_API_URL || 'https://api.tradeconnect.example'

// Helper to handle HTTP errors
const handleResponse = async (response) => {
  if (!response.ok) {
    // Try to get error message from response
    try {
      const errorData = await response.json()
      throw new Error(errorData.message || `API Error: ${response.status}`)
    } catch (e) {
      throw new Error(`API Error: ${response.status}`)
    }
  }
  return response.json()
}

// For demonstration purposes - mocks API calls
// In a real app, this would be replaced with actual API calls
const mockDelay = () => new Promise(resolve => setTimeout(resolve, 800))

// Generic request function
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token')
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers
  }
  
  const config = {
    ...options,
    headers
  }
  
  // For demo purposes - simulate API delay
  await mockDelay()
  
  // In a real app, this would be a fetch call to your API
  // return fetch(`${API_URL}${endpoint}`, config).then(handleResponse)
  
  // For demo, we'll just return mock data
  console.log(`API Call: ${endpoint}`, config)
  
  // For now, returns a mock successful response
  // This would be replaced with actual API integration
  return Promise.resolve({ success: true, data: {} })
}

// API request methods
export const api = {
  get: (endpoint, options = {}) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, data, options = {}) => request(endpoint, { 
    ...options, 
    method: 'POST',
    body: JSON.stringify(data)
  }),
  put: (endpoint, data, options = {}) => request(endpoint, { 
    ...options, 
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (endpoint, options = {}) => request(endpoint, { ...options, method: 'DELETE' }),
  
  // Specific API endpoints can be defined here
  products: {
    getAll: () => api.get('/products'),
    getById: (id) => api.get(`/products/${id}`),
    create: (data) => api.post('/products', data),
    update: (id, data) => api.put(`/products/${id}`, data),
    delete: (id) => api.delete(`/products/${id}`)
  },
  
  documents: {
    getAll: () => api.get('/documents'),
    getById: (id) => api.get(`/documents/${id}`),
    upload: (data) => api.post('/documents', data)
  },
  
  recommendations: {
    getAll: () => api.get('/recommendations'),
    getForProduct: (productId) => api.get(`/recommendations/product/${productId}`)
  }
}

export default api