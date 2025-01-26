// components/SizeSelector.jsx
import React from 'react'

export default function SizeSelector({ sizes, selectedSize, onSizeChange }) {
  return (
    <div className="py-2">
      <h3 className="text-lg font-semibold">Available Sizes:</h3>
      <div className="mb-4 mt-2 flex items-baseline text-gray-700 dark:text-gray-300">
        <div className="flex space-x-3">
          {sizes.map((size) => (
            <label key={size} className="cursor-pointer text-center">
              <input
                aria-label="size"
                type="radio"
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-600"
                name="size"
                value={size}
                checked={selectedSize === size}
                onChange={() => onSizeChange(size)}
              />
              <p className="text-sm font-semibold text-gray-600">{size}</p>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
