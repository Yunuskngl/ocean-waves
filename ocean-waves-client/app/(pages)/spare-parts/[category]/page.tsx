"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { CategoryClient } from "../../../components/category-client"
import { SPARE_PARTS_CATEGORIES, getDummyProductsByCategory, type SparePartsCategory } from "../../../dummy/product"
import useProductStore from "../../../store/product-store"

function CategoryOrProductPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.category as string

  const getProductById = useProductStore((state) => state.getProductById)
  const setSelectedProduct = useProductStore((state) => state.setSelectedProduct)

  const category = SPARE_PARTS_CATEGORIES.find((cat: SparePartsCategory) => cat.slug === slug)

  if (category) {
    const products = getDummyProductsByCategory(category.name)
    return <CategoryClient category={category} products={products} />
  }

  const product = slug ? getProductById(slug) : null

  useEffect(() => {
    if (product) {
      setSelectedProduct(product)
    } else if (slug) {
      router.push("/spare-parts")
    }
  }, [product, slug, setSelectedProduct, router])

  if (!product) {
    return null
  }

  // Product ise product detay sayfasını göster
  const defaultCategory: SparePartsCategory = {
    name: product.title,
    slug: product.id,
    image: product.image[0] || "/images/placeholder.jpg",
  }

  return <CategoryClient category={defaultCategory} products={[product]} />
}

export default function CategoryPage() {
  return <CategoryOrProductPage />
}