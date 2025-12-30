"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import useProductStore from "@/app/store/product-store"
import { Product } from "@/app/types/product"

// Markalar listesi
const brands = [
  { name: "ABB" },
  { name: "MAN" },
  { name: "Mitsubishi" },
  { name: "KBB" },
  { name: "NAPIER" },
  { name: "IHI" },
]

// Animasyonlar
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function SparePartsPage() {

  const products = useProductStore((state) => state.products);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 bg-[#0f172a] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/turbocharger-spare-parts-industrial-warehouse 2.jpg"
            alt="Spare Parts Warehouse"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/80 via-[#0f172a]/50 to-[#0f172a]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Spare Parts
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            We supply original, OEM and alternative spare parts for marine and power plant turbocharger systems, ensuring accurate parts selection
for maintenance, repair, and overhaul operations to support reliable and efficient performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. CATEGORIES GRID */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {products.map((product: Product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <Link
                  href={`/spare-parts/${product.id}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-[#00357a]/30 h-full flex flex-col"
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                    <Image
                      src={product.image[0] || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[#00357a]/0 group-hover:bg-[#00357a]/10 transition-colors duration-300" />
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* BAŞLIK */}
                    <h2 className="text-xl font-bold text-[#0f172a] mb-6 group-hover:text-[#00357a] transition-colors">
                      {product.title}
                    </h2>

                    {/* BUTON: "MORE" */}
                    <div className="flex items-center gap-2 text-sm font-bold text-[#00357a] mt-auto group-hover:underline decoration-2 underline-offset-4">
                      <span className="uppercase tracking-wider">MORE</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. SUPPORTED BRANDS */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-[#00357a] mb-6">Supported Turbocharger Manufacturers</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              The turbocharger manufacturer brands for which we provide maintenance, repair, spare parts, and technical
              consultancy services.
            </p>
          </motion.div>

          {/* MODERN LİSTE GÖRÜNÜMÜ */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-8 gap-y-4 max-w-6xl mx-auto"
          >
            {brands.map((brand, index) => (
              <div key={index} className="flex items-center">
                {/* Marka İsmi */}
                <span className="text-3xl md:text-3xl font-black text-slate-500 hover:text-[#00357a] transition-colors duration-300 cursor-default tracking-tight">
                  {brand.name}
                </span>

                {/* Ayraç (Nokta) */}
                {index !== brands.length - 1 && <div className="w-2 h-2 rounded-full bg-[#00357a] ml-4 md:ml-8" />}
              </div>
            ))}
          </motion.div>

          {/* Boş Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-slate-100"
          ></motion.div>
        </div>
      </section>
    </div>
  )
}
