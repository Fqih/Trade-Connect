export const Dropdown = ({
    label,
    name,
    value,
    onChange,
    options,
    placeholder = "Select an option",
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
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : ''} ${className}`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  }