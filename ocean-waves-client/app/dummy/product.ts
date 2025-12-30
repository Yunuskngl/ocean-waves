import type { Product } from "../types/product"

export interface SparePartsCategory {
  name: string
  slug: string
  image: string
}

export const SPARE_PARTS_CATEGORIES: SparePartsCategory[] = [
  {
    name: "Complete Turbochargers",
    slug: "complete-turbochargers",
    image: "/images/TurboCharger.png",
  },
  {
    name: "Cartridges",
    slug: "cartridges",
    image: "/images/cartridge (1).jpg",
  },
  {
    name: "Rotor Shafts",
    slug: "rotor-shafts",
    image: "/images/RotorShaft.jpeg",
  },
  {
    name: "Bearings",
    slug: "bearings",
    image: "/images/ball-bearing-industrial-precision.jpg",
  },
  {
    name: "Overhaul Kits",
    slug: "overhaul-kits",
    image: "/images/ServiceKits.jpeg",
  },
  {
    name: "Nozzle Rings",
    slug: "nozzle-rings",
    image: "/images/Adsız tasarım (4).jpg",
  },
  {
    name: "Casings",
    slug: "casings",
    image: "/images/casingg.jpg",
  },
  {
    name: "Air Filter-Silencer",
    slug: "air-filter-silencer",
    image: "/images/silencer.jpg",
  },
]

function generateDummyProducts(categoryName: string, count: number = 3): Product[] {
  const manufacturers = ["ABB", "MAN", "MET", "IHI", "KBB", "NAPIER", "YANMAR", "DAIHATSU", "VOLVO PENTA"]
  
  return Array.from({ length: count }, (_, i) => {
    const manufacturer = manufacturers[i % manufacturers.length]
    const partNumber = `${manufacturer}-${categoryName.substring(0, 3).toUpperCase()}-${String(i + 1).padStart(4, '0')}`
    
    return {
      id: `product-${categoryName.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
      title: `${manufacturer} ${categoryName} ${i + 1}`,
      description: `High-quality ${categoryName.toLowerCase()} for ${manufacturer} turbocharger systems. Designed for optimal performance and reliability in marine and power plant applications. This component ensures maximum efficiency and durability under demanding operational conditions.`,
      image: [
        "/images/placeholder.jpg",
        "/images/placeholder.jpg",
        "/images/placeholder.jpg",
      ],
      features: [
        "OEM Compliant Specifications",
        "Global Delivery Available",
        "Certified Quality Control",
        "Extended Warranty Coverage",
        "Technical Support Included",
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })
}

export function getDummyProductsByCategory(categoryName: string): Product[] {
  return generateDummyProducts(categoryName, 3)
}

