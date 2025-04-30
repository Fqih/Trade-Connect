import { useState } from 'react'

// A reusable form hook to handle common form operations
export const useForm = (initialValues = {}, validate = () => ({})) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const inputValue = type === 'checkbox' ? checked : value
    
    setValues({
      ...values,
      [name]: inputValue
    })
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
    
    // Mark field as touched
    setTouched({
      ...touched,
      [name]: true
    })
  }

  // Handle field blur
  const handleBlur = (e) => {
    const { name } = e.target
    
    setTouched({
      ...touched,
      [name]: true
    })
    
    // Validate on blur
    const validationErrors = validate(values)
    setErrors(validationErrors)
  }

  // Handle form reset
  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }

  // Handle form submission
  const handleSubmit = async (onSubmit) => {
    return (e) => {
      e.preventDefault()
      
      const validationErrors = validate(values)
      setErrors(validationErrors)
      
      if (Object.keys(validationErrors).length === 0) {
        setIsSubmitting(true)
        return onSubmit(values, { reset })
          .finally(() => setIsSubmitting(false))
      }
    }
  }

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValues,
    setErrors
  }
}