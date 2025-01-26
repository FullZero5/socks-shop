import { ShoppingCart, Trash2Icon } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ConfirmationButton } from './confirmation-button'

export function ItemCart() {
  const { items, removeItem, clearCart } = useCartStore()

  // Общая сумма корзины
  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.pieces,
    0,
  )

  // Функция для удаления товара
  const handleRemoveItem = (itemId, itemsSize) => {
    removeItem(itemId, itemsSize)
  }

  const handleCheckout = () => {
    window.location.href = '/checkout' // Переход на страницу Checkout
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative">
          {items.length > 0 && (
            <span className="absolute -right-1 -top-1 rounded-full px-2 py-1 text-xs text-black dark:text-white">
              {items.reduce((sum, item) => sum + item.pieces, 0)}
            </span>
          )}
          <ShoppingCart className="text-grayishblue relative h-5 w-5 cursor-pointer" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mr-2 w-80">
        <h1 className="border-b pb-3 text-lg font-extrabold">Cart</h1>
        {items.length > 0 ? (
          <>
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-3 py-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="rounded-lg"
                />
                <div>
                  <p className="text-grayishblue text-sm">
                    "{item.name}" size: {item.size}
                  </p>
                  <p className="text-grayishblue text-sm">
                    {item.price} ₽ x {item.pieces} ={' '}
                    <span className="font-bold text-black dark:text-white">
                      {item.price * item.pieces} ₽
                    </span>
                  </p>
                </div>
                <ConfirmationButton
                  triggerItem={
                    <Trash2Icon className="h-4 w-4 cursor-pointer text-gray-700 hover:text-red-500" />
                  }
                  dialogTitle={`Remove "${item.name}" size ${item.size}?`}
                  dialogDescription={
                    'This action cannot be undone, you will need to add the item again to your cart.'
                  }
                  onSubmit={() => handleRemoveItem(item.id, item.size)}
                />
              </div>
            ))}
            <div className="border-t pt-3">
              <p className="text-grayishblue text-sm">
                Total:{' '}
                <span className="font-bold text-black dark:text-white">
                  {totalAmount} ₽
                </span>
              </p>
            </div>
            <ConfirmationButton
              triggerItem={
                <Button
                  variant="opacity"
                  className="mt-3 w-full bg-gray-900 px-5 py-2 font-semibold text-white dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300"
                >
                  Checkout
                </Button>
              }
              dialogTitle={'Checkout Confirmation'}
              dialogDescription={
                'By clicking Yes, you will proceed to checkout.'
              }
              onSubmit={handleCheckout}
            />
          </>
        ) : (
          <div className="flex h-[100px] items-center justify-center">
            <p className="text-grayishblue text-lg font-bold">Empty</p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
