// src/pages/auth/Register.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Input } from '../../components/ui/Input'
import { Dropdown } from '../../components/ui/Dropdown'
import { RadioButton } from '../../components/ui/RadioButton'
import { Checkbox } from '../../components/ui/Checkbox'
import { Button } from '../../components/ui/Button'
import { Eye, EyeOff } from 'lucide-react'

const Register = () => {
  const [formData, setFormData] = useState({
    accountType: 'supplier',
    province: '',
    email: '',
    password: '',
    repeatPassword: '',
    company: '',
    picName: '',
    phone: '',
    showPassword: false,
    showRepeatPassword: false
  })
  const [errors, setErrors] = useState({})
  const { register } = useAuth()
  const navigate = useNavigate()

  const provinces = [
    { value: 'aceh', label: 'Aceh' },
    { value: 'sumut', label: 'Sumatera Utara' },
    { value: 'sumbar', label: 'Sumatera Barat' },
    { value: 'riau', label: 'Riau' },
    { value: 'jambi', label: 'Jambi' },
    { value: 'sumsel', label: 'Sumatera Selatan' },
    { value: 'bengkulu', label: 'Bengkulu' },
    { value: 'lampung', label: 'Lampung' },
    { value: 'jakarta', label: 'DKI Jakarta' },
    { value: 'jabar', label: 'Jawa Barat' },
    { value: 'jateng', label: 'Jawa Tengah' },
    { value: 'jogja', label: 'DI Yogyakarta' },
    { value: 'jatim', label: 'Jawa Timur' },
    { value: 'bali', label: 'Bali' }
    // Tambahkan provinsi lainnya
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setFormData({
        ...formData,
        showPassword: !formData.showPassword
      })
    } else if (field === 'repeatPassword') {
      setFormData({
        ...formData,
        showRepeatPassword: !formData.showRepeatPassword
      })
    }
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.province) {
      newErrors.province = 'Province is required'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    
    if (!formData.repeatPassword) {
      newErrors.repeatPassword = 'Please confirm your password'
    } else if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = 'Passwords do not match'
    }
    
    if (!formData.company) {
      newErrors.company = 'Company name is required'
    }
    
    if (!formData.picName) {
      newErrors.picName = 'PIC name is required'
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (validate()) {
      const userData = {
        accountType: formData.accountType,
        province: formData.province,
        email: formData.email,
        password: formData.password,
        company: formData.company,
        picName: formData.picName,
        phone: formData.phone
      }
      
      const result = await register(userData)
      
      if (result.success) {
        navigate('/')
      } else {
        setErrors({
          auth: result.error || 'Registration failed. Please try again.'
        })
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="mt-2">
            Have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              Sign in
            </Link>
          </p>
        </div>
        
        {errors.auth && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {errors.auth}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700">Account Type</label>
              <div className="flex space-x-6">
                <RadioButton
                  name="accountType"
                  value="supplier"
                  checked={formData.accountType === 'supplier'}
                  onChange={handleChange}
                  label="Supplier"
                />
                <RadioButton
                  name="accountType"
                  value="buyer"
                  checked={formData.accountType === 'buyer'}
                  onChange={handleChange}
                  label="Buyer"
                />
              </div>
            </div>
            
            <Dropdown
              label="Province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              options={provinces}
              placeholder="- Choose Province -"
              error={errors.province}
              required
            />
            
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={formData.showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('password')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {formData.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              <div className="mt-1">
                <Checkbox
                  name="showPassword"
                  checked={formData.showPassword}
                  onChange={() => togglePasswordVisibility('password')}
                  label="Show Password"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="repeatPassword" className="block mb-2 font-medium text-gray-700">
                Repeat Password
              </label>
              <div className="relative">
                <input
                  id="repeatPassword"
                  name="repeatPassword"
                  type={formData.showRepeatPassword ? "text" : "password"}
                  value={formData.repeatPassword}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.repeatPassword ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('repeatPassword')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {formData.showRepeatPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.repeatPassword && <p className="mt-1 text-sm text-red-500">{errors.repeatPassword}</p>}
              <div className="mt-1">
                <Checkbox
                  name="showRepeatPassword"
                  checked={formData.showRepeatPassword}
                  onChange={() => togglePasswordVisibility('repeatPassword')}
                  label="Show Password"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Business Information</h2>
            
            <Input
              label="Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              error={errors.company}
              required
            />
            
            <Input
              label="PIC (Name)"
              name="picName"
              value={formData.picName}
              onChange={handleChange}
              error={errors.picName}
              required
            />
            
            <Input
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              required
            />
          </div>
          
          <Button type="submit" variant="danger" fullWidth className="text-xl py-4">
            Create My Account
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Register