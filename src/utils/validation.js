// Form validation utilities

// Basic email validation
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  // Phone number validation (basic example)
  export const validatePhone = (phone) => {
    const phoneRegex = /^\d{6,15}$/
    return phoneRegex.test(phone)
  }
  
  // Password validation (at least 8 characters)
  export const validatePassword = (password) => {
    return password && password.length >= 8
  }
  
  // Generic required field validation
  export const validateRequired = (value) => {
    return value && value.trim() !== ''
  }
  
  // Login form validation
  export const validateLogin = (values) => {
    const errors = {}
    
    if (!validateRequired(values.email)) {
      errors.email = 'Email is required'
    } else if (!validateEmail(values.email)) {
      errors.email = 'Invalid email format'
    }
    
    if (!validateRequired(values.password)) {
      errors.password = 'Password is required'
    }
    
    return errors
  }
  
  // Registration form validation
  export const validateRegistration = (values) => {
    const errors = {}
    
    if (!validateRequired(values.province)) {
      errors.province = 'Province is required'
    }
    
    if (!validateRequired(values.email)) {
      errors.email = 'Email is required'
    } else if (!validateEmail(values.email)) {
      errors.email = 'Invalid email format'
    }
    
    if (!validateRequired(values.password)) {
      errors.password = 'Password is required'
    } else if (!validatePassword(values.password)) {
      errors.password = 'Password must be at least 8 characters'
    }
    
    if (!validateRequired(values.repeatPassword)) {
      errors.repeatPassword = 'Please confirm your password'
    } else if (values.password !== values.repeatPassword) {
      errors.repeatPassword = 'Passwords do not match'
    }
    
    if (!validateRequired(values.company)) {
      errors.company = 'Company name is required'
    }
    
    if (!validateRequired(values.picName)) {
      errors.picName = 'PIC name is required'
    }
    
    if (!validateRequired(values.phone)) {
      errors.phone = 'Phone number is required'
    } else if (!validatePhone(values.phone)) {
      errors.phone = 'Invalid phone number'
    }
    
    return errors
  }
  
  // Product form validation
  export const validateProduct = (values) => {
    const errors = {}
    
    if (!validateRequired(values.name)) {
      errors.name = 'Product name is required'
    }
    
    if (!validateRequired(values.category)) {
      errors.category = 'Category is required'
    }
    
    if (!validateRequired(values.description)) {
      errors.description = 'Description is required'
    }
    
    return errors
  }