// components/ProductDetails.jsx
import React from 'react'
import Counter from './Counter.jsx'
import SizeSelector from './SizeSelector.jsx'

export default function ProductDetails({ product }) {
  const [selectedSize, setSelectedSize] = React.useState(product.size[0]) // Состояние для выбранного размера

  return (
    <div>
      <h1 className="text-3xl font-bold animate-in sm:text-4xl">
        {product.name}
      </h1>
      <p className="max-w-sm py-2 text-lg">{product.description}</p>

      {/* Отображение размеров */}
      <SizeSelector
        sizes={product.size}
        selectedSize={selectedSize}
        onSizeChange={(size) => setSelectedSize(size)}
      />

      {/* Цена и кнопка "Add to cart" */}
      <div className="pt-2 text-right sm:pt-4">
        <div className="text-3xl font-semibold">
          {product.price.toLocaleString()} ₽
        </div>
        <div className="text-xs text-gray-500">* This is a fictional price</div>
        <Counter product={product} selectedSize={selectedSize} />
      </div>
    </div>
  )
}
