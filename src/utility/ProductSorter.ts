import type { Product } from '../types/Product'

export type SortBy = 'price' | 'category' | 'color' | 'size' | 'gender'
export type SortOrder = 'asc' | 'desc'

const sortFunctions: {
  [key in SortBy]: (
    a: Product,
    b: Product,
    order: SortOrder,
  ) => number | undefined
} = {
  price: (a, b, order) =>
    order === 'asc' ? a.price - b.price : b.price - a.price,
  category: (a, b, order) =>
    order === 'asc'
      ? a.category.localeCompare(b.category)
      : b.category.localeCompare(a.category),
  color: (a, b, order) =>
    order === 'asc'
      ? a.color.localeCompare(b.color)
      : b.color.localeCompare(a.color),
  size: (a, b, order) => {
    const minSizeA = Math.min(...(a.size ?? []))
    const minSizeB = Math.min(...(b.size ?? []))
    return order === 'asc' ? minSizeA - minSizeB : minSizeB - minSizeA
  },
  gender: (a, b, order) =>
    order === 'asc'
      ? a.gender.localeCompare(b.gender)
      : b.gender.localeCompare(a.gender),
}

export class ProductSorter {
  /**
   * Сортирует массив продуктов по указанному полю и порядку.
   * @param products Массив продуктов для сортировки.
   * @param sortBy Поле для сортировки (price, category, color, size).
   * @param sortOrder Порядок сортировки (asc или desc).
   * @returns Отсортированный массив продуктов.
   */
  static sortProducts(
    products: Product[],
    sortBy: SortBy | null,
    sortOrder: SortOrder,
    size?: number,
  ): Product[] {
    // Фильтрация по размеру, если он указан
    let filteredProducts = products
    if (size !== undefined) {
      filteredProducts = products.filter((product) =>
        product.size?.includes(size),
      )
    }

    // Если sortBy не указан, возвращаем отфильтрованные продукты без сортировки
    if (!sortBy) return filteredProducts

    // Проверяем, существует ли функция для сортировки
    const sortFunction = sortFunctions[sortBy]
    if (!sortFunction) {
      console.warn(`Сортировка по полю "${sortBy}" не поддерживается.`)
      return filteredProducts
    }

    // Сортировка
    return filteredProducts.sort((a, b) => sortFunction(a, b, sortOrder) || 0)
  }
}
