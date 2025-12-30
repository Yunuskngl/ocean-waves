"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MessageSquare, CheckCircle } from "lucide-react"
import { Button } from "./ui/button"
import type { Product } from "../types/product"
import type { SparePartsCategory } from "../dummy/product"
import { motion } from "framer-motion"

interface CategoryClientProps {
  category: SparePartsCategory
  products: Product[]
}

export function CategoryClient({ category, products }: CategoryClientProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  const firstProduct = products[0]
  const images = firstProduct && firstProduct.image && firstProduct.image.length > 0
    ? firstProduct.image
    : [category.image || "/images/placeholder.jpg"]

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative pt-32 pb-16 bg-[#0f172a]">
        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/spare-parts"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-6 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Catalog</span>
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            {category.name}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl font-light">
            Genuine and OEM-quality spare parts.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="w-full max-w-[600px] mx-auto lg:mx-0">
              <div className="relative aspect-square bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <Image
                  src={images[selectedImage]}
                  alt={category.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {images.length > 1 && (
                <div className="grid grid-cols-5 gap-3 mt-4">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === idx 
                          ? "border-[#00357a] ring-2 ring-[#00357a]/20" 
                          : "border-slate-200 hover:border-[#00357a]/50"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`View ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-4 flex items-center gap-2">
                Product Description
                <div className="h-px flex-grow bg-slate-200 ml-4"></div>
              </h2>
              
              <div className="prose prose-slate text-slate-600 leading-relaxed text-lg">
                {firstProduct?.description && (
                  <p className="mt-4">{firstProduct.description}</p>
                )}
              </div>

              {firstProduct?.features && firstProduct.features.length > 0 && (
                <ul className="mt-6 space-y-2">
                  {firstProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-slate-700">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow max-w-md">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#0f172a]">Need a Quote?</h3>
                  <p className="text-sm text-slate-500">Fast response within 24 hours.</p>
                </div>
                <div className="w-10 h-10 bg-[#00357a]/10 rounded-full flex items-center justify-center text-[#00357a]">
                  <MessageSquare className="h-5 w-5" />
                </div>
              </div>

              <Button
                className="w-full bg-[#00357a] hover:bg-[#002555] text-white font-semibold h-11 text-base shadow-md"
                asChild
              >
                <Link href={`/contact?subject=Inquiry for ${category.name}`}>
                  Contact Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

