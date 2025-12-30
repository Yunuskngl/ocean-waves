import { create } from "zustand"
import type { Product } from "../types/product"

interface ProductState {
  products: Product[]
  selectedProduct: Product | null
  setProducts: (products: Product[]) => void
  setSelectedProduct: (product: Product | null) => void
  getProductById: (id: string) => Product | undefined
}

const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  selectedProduct: null,
  setProducts: (products: Product[]) => set({ products }),
  setSelectedProduct: (product: Product | null) => set({ selectedProduct: product }),
  getProductById: (id: string) => {
    return get().products.find((product) => product.id === id)
  },
}))

export default useProductStore;