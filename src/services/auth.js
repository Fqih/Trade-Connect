import api from './api'

// For demo purposes - mock user data
const MOCK_USERS = [
  {
    id: '1',
    email: 'supplier@example.com',
    password: 'password123',
    accountType: 'supplier',
    company: 'ABC Trading',
    picName: 'John Doe',
    phone: '123456789',
    province: 'jakarta'
  },
  {
    id: '2',
    email: 'buyer@example.com',
    password: 'password123',
    accountType: 'buyer',
    company: 'XYZ Imports',
    picName: 'Jane Smith',
    phone: '987654321',
    province: 'jabar'
  }
]

// Login user
export const loginUser = async (email, password) => {
  try {
    // In a real app, this would be an API call:
    // const response = await api.post('/auth/login', { email, password })
    // return response.data
    
    // For demo, check against mock data
    const user = MOCK_USERS.find(u => u.email === email)
    
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password')
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Create a user object without the password
    const { password: _, ...userData } = user
    
    // Store a mock token
    localStorage.setItem('token', `mock-jwt-token-${userData.id}`)
    
    return userData
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

// Register new user
export const registerUser = async (userData) => {
  try {
    // In a real app, this would be an API call:
    // const response = await api.post('/auth/register', userData)
    // return response.data
    
    // For demo, just return the user data with a fake ID
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const newUser = {
      id: `user-${Date.now()}`,
      ...userData
    }
    
    // Store a mock token
    localStorage.setItem('token', `mock-jwt-token-${newUser.id}`)
    
    // Return user without password
    const { password, repeatPassword, ...newUserData } = newUser
    return newUserData
  } catch (error) {
    console.error('Registration error:', error)
    throw error
  }
}

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('token')
}

// Check if user is authenticated
export const checkAuthStatus = async () => {
  try {
    const token = localStorage.getItem('token')
    
    if (!token) {
      return null
    }
    
    // In a real app, this would be an API call to verify the token:
    // const response = await api.get('/auth/me')
    // return response.data
    
    // For demo, just return a mock user based on the token
    if (token.includes('user-1')) {
      const { password, ...userData } = MOCK_USERS[0]
      return userData
    }
    
    return null
  } catch (error) {
    console.error('Auth check error:', error)
    localStorage.removeItem('token')
    return null
  }
}