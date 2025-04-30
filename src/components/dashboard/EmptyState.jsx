import { Button } from '../ui/Button'
import { Box } from 'lucide-react'

const EmptyState = ({ 
  title = "No data found", 
  description = "There's nothing here yet", 
  icon = null,
  buttonText = "Add New",
  onButtonClick = () => {},
  showButton = true
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-12 text-center">
      <div className="flex justify-center mb-4">
        {icon || (
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <Box size={32} className="text-gray-400" />
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">{description}</p>
      
      {showButton && (
        <Button onClick={onButtonClick} variant="primary">
          {buttonText}
        </Button>
      )}
    </div>
  )
}

export default EmptyState