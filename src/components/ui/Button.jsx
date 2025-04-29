export const Button = ({ 
    children, 
    onClick, 
    type = "button", 
    variant = "primary", 
    fullWidth = false,
    className = ""
  }) => {
    const baseStyles = "py-3 px-4 rounded font-medium focus:outline-none transition duration-150 ease-in-out"
    
    const variantStyles = {
      primary: "bg-green-500 hover:bg-green-600 text-white",
      secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
      danger: "bg-red-500 hover:bg-red-600 text-white"
    }
    
    const widthStyles = fullWidth ? "w-full" : ""
    
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
      >
        {children}
      </button>
    )
  }