export const Input = ({
    label,
    name,
    type = "text",
    placeholder = "",
    value,
    onChange,
    error,
    required = false,
    className = ""
  }) => {
    return (
      <div className="mb-4">
        {label && (
          <label htmlFor={name} className="block mb-2 font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : ''} ${className}`}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  }