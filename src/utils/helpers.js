// Format date to a readable string
export const formatDate = (date) => {
    if (!date) return ''
    
    const d = new Date(date)
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return d.toLocaleDateString('en-US', options)
  }
  
  // Format currency (in IDR)
  export const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return ''
    
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }
  
  // Truncate long text
  export const truncateText = (text, maxLength = 100) => {
    if (!text) return ''
    if (text.length <= maxLength) return text
    
    return text.slice(0, maxLength) + '...'
  }
  
  // Generate random ID (for demo purposes)
  export const generateId = () => {
    return Math.random().toString(36).substring(2, 15)
  }
  
  // Calculate time elapsed since a date
  export const timeAgo = (date) => {
    if (!date) return ''
    
    const seconds = Math.floor((new Date() - new Date(date)) / 1000)
    
    let interval = seconds / 31536000
    if (interval > 1) return Math.floor(interval) + ' years ago'
    
    interval = seconds / 2592000
    if (interval > 1) return Math.floor(interval) + ' months ago'
    
    interval = seconds / 86400
    if (interval > 1) return Math.floor(interval) + ' days ago'
    
    interval = seconds / 3600
    if (interval > 1) return Math.floor(interval) + ' hours ago'
    
    interval = seconds / 60
    if (interval > 1) return Math.floor(interval) + ' minutes ago'
    
    return Math.floor(seconds) + ' seconds ago'
  }
  
  // Get file extension
  export const getFileExtension = (filename) => {
    if (!filename) return ''
    return filename.split('.').pop().toLowerCase()
  }
  
  // Check if file is an image
  export const isImageFile = (filename) => {
    const extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']
    const ext = getFileExtension(filename)
    return extensions.includes(ext)
  }
  
  // Create initials from name
  export const getInitials = (name) => {
    if (!name) return ''
    
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }