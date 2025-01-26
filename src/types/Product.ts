export interface ProductList {
  [x: string]: any
  products: Product[]
  total: number
  skip: number
  limit: number
}

export enum ProductCategory {
  Shirts = 'shirts',
  Pants = 'pants',
  Shoes = 'shoes',
  Socks = 'socks',
  Booties = 'booties',
}

export enum ProductGender {
  Male = 'male',
  Female = 'female',
  Kids = 'kids',
  Unisex = 'unisex',
}

export interface Product {
  id: number
  name: string
  slug: string
  price: number
  description: string
  cover: string
  coverCredits: string
  color: string
  category: ProductCategory
  size: number[]
  gender: ProductGender
}
