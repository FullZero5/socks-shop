import React from 'react'
import { CounterButton } from './counter-button'
import { Button } from '../ui/button'
import { useCartStore } from '../../store/cartStore' // Импортируем новое хранилище

export default function Counter({ product, selectedSize }) {
  const [itemCounter, setItemCounter] = React.useState(0) // Локальное состояние для счетчика
  const { addItem } = useCartStore() // Метод для добавления товара в корзину

  const handleCounter = (action) => {
    if (action === 'increment') {
      setItemCounter(itemCounter + 1)
    } else if (action === 'decrement' && itemCounter > 0) {
      setItemCounter(itemCounter - 1)
    }
  }

  const handleAddToCart = () => {
    if (itemCounter === 0 || !selectedSize) return

    // Создаем объект товара с учетом размера
    const item = {
      id: product.id, // Уникальный идентификатор товара
      name: product.name,
      price: product.price,
      pieces: itemCounter, // Количество из счетчика
      image: product.cover, // Изображение товара
      size: selectedSize, // Выбранный размер
    }

    // Добавляем товар в корзину
    addItem(item)

    // Сбрасываем счетчик
    setItemCounter(0)
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <CounterButton
        client:load
        handleIncrement={() => handleCounter('increment')}
        itemCounter={itemCounter}
        handleDecrement={() => handleCounter('decrement')}
        className="h-12 w-full md:w-auto"
      />
      <Button
        client:load
        variant="outline"
        className="h-12 w-full bg-gray-900 px-5 py-2 font-semibold text-white dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 md:w-auto"
        onClick={handleAddToCart}
        disabled={!selectedSize} // Кнопка неактивна, если размер не выбран
      >
        Add to Cart
      </Button>
    </div>
  )
}
