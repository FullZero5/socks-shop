import productsData from './products.json'
import {
  type Product,
  type ProductList,
  ProductCategory,
} from '../types/Product'
import {
  ProductSorter,
  type SortBy,
  type SortOrder,
} from '../utility/ProductSorter'

// Преобразуем данные один раз при загрузке
export const products: Product[] = productsData.map((product) => ({
  ...product,
  category: product.category as ProductCategory,
}))

/**
 * Возвращает постраничный список продуктов, отфильтрованный по цвету, размеру и гендеру, и отсортированный по цене/категории/цвету.
 * @param {number} [skip=0] - Количество элементов, которые нужно пропустить в списке.
 * @param {number} [limit=10] - Максимальное количество элементов.
 * @param {SortBy | null} [sortBy='price'] - Поле, по которому выполняется сортировка.
 * @param {SortOrder} [sortOrder='asc'] - Порядок сортировки.
 * @param {string | null} [filterByColor=null] - Цвет, по которому выполняется фильтрация.
 * @param {number | null} [size=null] - Размер, по которому выполняется фильтрация.
 * @param {string | null} [filterByGender=null] - Гендер, по которому выполняется фильтрация.
 * @returns {ProductList} - Объект, содержащий постраничный список продуктов, общее количество продуктов, skip и limit.
 */
export const getProducts = (
  skip: number = 0,
  limit: number = 10,
  sortBy: SortBy = 'price',
  sortOrder: SortOrder = 'asc',
  filterByColor: string | null = null,
  size: number | null = null,
  filterByGender: string | null = null,
): ProductList => {
  let filteredProducts = [...products] // Используем уже преобразованный массив

  // Фильтрация по цвету
  if (filterByColor != null && filterByColor.trim()) {
    filteredProducts = filteredProducts.filter(
      (product) => product.color.toLowerCase() === filterByColor.toLowerCase(),
    )
  }

  // Фильтрация по размеру
  if (size !== null) {
    filteredProducts = filteredProducts.filter(
      (product) => product.size?.includes(size) ?? false,
    )
  }

  // Фильтрация по гендеру
  if (filterByGender != null && filterByGender.trim()) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.gender.toLowerCase() === filterByGender.toLowerCase(),
    )
  }

  // Сортировка
  if (sortBy) {
    filteredProducts = ProductSorter.sortProducts(
      filteredProducts,
      sortBy,
      sortOrder,
      size || undefined,
    )
  }

  // Пагинация
  const total = filteredProducts.length
  const paginatedProducts = filteredProducts.slice(
    Math.max(0, skip),
    Math.min(skip + limit, filteredProducts.length),
  )

  return {
    products: paginatedProducts,
    total,
    skip,
    limit,
  }
}
