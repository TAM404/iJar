//Form validation rules
// Basic email validation
export const validateEmail = (email) => {
    if (!email) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format'
    return null
  }
  
  // Password validation
  export const validatePassword = (password) => {
    if (!password) return 'Password is required'
    if (password.length < 8) return 'Password must be at least 8 characters'
    if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter'
    if (!/[a-z]/.test(password)) return 'Password must contain a lowercase letter'
    if (!/[0-9]/.test(password)) return 'Password must contain a number'
    return null
  }
  
  // Required field validation
  export const validateRequired = (value, fieldName) => {
    if (!value?.toString().trim()) return `${fieldName} is required`
    return null
  }
  
  // Number validation
  export const validateNumber = (value, fieldName, options = {}) => {
    const num = Number(value)
    if (isNaN(num)) return `${fieldName} must be a number`
    if (options.min !== undefined && num < options.min) {
      return `${fieldName} must be at least ${options.min}`
    }
    if (options.max !== undefined && num > options.max) {
      return `${fieldName} must be less than ${options.max}`
    }
    return null
  }
  
  // URL validation for images
  export const validateImageUrl = (url) => {
    if (!url) return null // Allow empty
    try {
      new URL(url)
      if (!/\.(jpg|jpeg|png|webp|avif)$/i.test(url)) {
        return 'Image URL must be a valid image file (jpg, png, webp, avif)'
      }
      return null
    } catch {
      return 'Invalid URL format'
    }
  }
  
  // Property validation schema
  export const validateProperty = (property) => {
    const errors = {}
    
    // Required fields
    errors.title = validateRequired(property.title, 'Title')
    errors.description = validateRequired(property.description, 'Description')
    errors.price = validateNumber(property.price, 'Price', { min: 0 })
    errors.bedrooms = validateNumber(property.bedrooms, 'Bedrooms', { min: 0 })
    errors.bathrooms = validateNumber(property.bathrooms, 'Bathrooms', { min: 0 })
    errors.latitude = validateNumber(property.latitude, 'Latitude', { 
      min: -90, 
      max: 90 
    })
    errors.longitude = validateNumber(property.longitude, 'Longitude', { 
      min: -180, 
      max: 180 
    })
    
    // Optional fields
    if (property.main_image) {
      errors.main_image = validateImageUrl(property.main_image)
    }
    
    // Check if any errors exist
    const hasErrors = Object.values(errors).some(error => error !== null)
    
    return hasErrors ? errors : null
  }
  
  // Form validation composer
  export const validateForm = (fields, validations) => {
    const errors = {}
    for (const [field, value] of Object.entries(fields)) {
      const validationFn = validations[field]
      if (validationFn) {
        const error = validationFn(value)
        if (error) errors[field] = error
      }
    }
    return Object.keys(errors).length > 0 ? errors : null
  }