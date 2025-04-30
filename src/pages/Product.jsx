import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Dropdown } from '../components/ui/Dropdown'
import { Plus } from 'lucide-react'
import ProductSection from '../components/dashboard/ProductSection'
import EmptyState from '../components/dashboard/EmptyState'

const Product = () => {
  const [products, setProducts] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    quantity: ''
  })
  const [errors, setErrors] = useState({})

  const productCategories = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing & Apparel' },
    { value: 'food', label: 'Food & Beverages' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'beauty', label: 'Beauty & Personal Care' },
    { value: 'sports', label: 'Sports & Outdoors' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'other', label: 'Other' }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.name) {
      newErrors.name = 'Product name is required'
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required'
    } else if (isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = 'Price must be a positive number'
    }
    
    if (!formData.quantity) {
      newErrors.quantity = 'Quantity is required'
    } else if (isNaN(formData.quantity) || formData.quantity < 0) {
      newErrors.quantity = 'Quantity must be a non-negative number'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validate()) {
      // Add new product
      const newProduct = {
        id: Date.now().toString(),
        ...formData
      }
      
      setProducts([...products, newProduct])
      
      // Reset form
      setFormData({
        name: '',
        category: '',
        price: '',
        description: '',
        quantity: ''
      })
      
      // Hide form
      setShowAddForm(false)
    }
  }

  const handleDelete = (productId) => {
    setProducts(products.filter(product => product.id !== productId))
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        {!showAddForm && (
          <Button onClick={() => setShowAddForm(true)} className="flex items-center">
            <Plus size={16} className="mr-2" />
            Add Product
          </Button>
        )}
      </div>
      
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
              />
              
              <Dropdown
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={productCategories}
                placeholder="- Select Category -"
                error={errors.category}
                required
              />
              
              <Input
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                error={errors.price}
                required
              />
              
              <Input
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                error={errors.quantity}
                required
              />
              
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="description" className="block mb-2 font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-4">
              <Button type="button" variant="secondary" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save Product
              </Button>
            </div>
          </form>
        </div>
      )}
      
      {products.length > 0 ? (
        <ProductSection products={products} onDelete={handleDelete} />
      ) : (
        <EmptyState 
          title="No products yet" 
          description="Add your first product to get started"
          buttonText="Add Product"
          onButtonClick={() => setShowAddForm(true)}
        />
      )}
    </div>
  )
}

export default Product