import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const storage = createJSONStorage(() => localStorage)

const isClient = typeof window !== 'undefined'

export const useCartStore = create()(
  persist(
    (set, get) => ({
      items: [], // Массив товаров
      addItem: (item) => {
        const currentItems = get().items
        const existingItem = currentItems.find(
          (i) => i.id === item.id && i.size === item.size, // Учитываем размер
        )
        if (existingItem) {
          // Если товар с таким размером уже есть, обновляем количество
          set({
            items: currentItems.map((i) =>
              i.id === item.id && i.size === item.size
                ? { ...i, pieces: i.pieces + item.pieces }
                : i,
            ),
          })
        } else {
          // Если товара с таким размером нет, добавляем его
          set({ items: [...currentItems, item] })
        }
      },
      removeItem: (itemId, size) => {
        const currentItems = get().items
        set({
          items: currentItems.filter(
            (item) => !(item.id === itemId && item.size === size), // Удаляем по id и размеру
          ),
        })
      },
      clearCart: () => set({ items: [] }),
      increaseItemQuantity: (itemId, size, quantity = 1) => {
        const currentItems = get().items
        set({
          items: currentItems.map((item) =>
            item.id === itemId && item.size === size
              ? { ...item, pieces: item.pieces + quantity }
              : item,
          ),
        })
      },
      decreaseItemQuantity: (itemId, size, quantity = 1) => {
        const currentItems = get().items
        const updatedItems = currentItems.map((item) =>
          item.id === itemId && item.size === size
            ? { ...item, pieces: Math.max(0, item.pieces - quantity) } // Уменьшаем количество, но не ниже 0
            : item,
        )

        // Удаляем товар, если его количество стало меньше или равно 0
        const filteredItems = updatedItems.filter(
          (item) => !(item.id === itemId && item.size === size && item.pieces <= 0),
        )

        set({ items: filteredItems })
      },
    }),
    {
      name: 'cartStore',
      storage: isClient ? storage : undefined,
    },
  ),
)

export const useFormStore = create()(
  persist(
    (set) => ({
      name: '',
      telephone: '',
      address: '',
      setFormField: (field, value) => set({ [field]: value }), // Функция для обновления полей формы
      clearForm: () => set({ name: '', telephone: '', address: '' }), // Функция для очистки формы
    }),
    {
      name: 'formStore', // Уникальное имя для хранилища
      storage: isClient ? storage : undefined, // Используем localStorage только на клиенте
    },
  ),
);