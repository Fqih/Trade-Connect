export const RadioButton = ({
    name,
    value,
    checked,
    onChange,
    label,
    className = ""
  }) => {
    return (
      <label className={`inline-flex items-center cursor-pointer ${className}`}>
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        />
        <span className="ml-2">{label}</span>
      </label>
    )
  }