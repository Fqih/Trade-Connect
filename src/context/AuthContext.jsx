import { createContext, useState, useEffect } from 'react'
import { loginUser, registerUser, logoutUser } from '../services/auth'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])
  
  const login = async (email, password) => {
    try {
      setLoading(true)
      const userData = await loginUser(email, password)
      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem('user', JSON.stringify(userData))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }
  
  const register = async (userData) => {
    try {
      setLoading(true)
      const newUser = await registerUser(userData)
      setUser(newUser)
      setIsAuthenticated(true)
      localStorage.setItem('user', JSON.stringify(newUser))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }
  
  const logout = () => {
    logoutUser()
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
  }
  
  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  }
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
