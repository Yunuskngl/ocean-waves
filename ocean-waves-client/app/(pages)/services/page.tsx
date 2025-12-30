"use client"
import Image from "next/image"
import {
  ArrowRight,
  ChevronDown,
} from "lucide-react"
import { Button } from "../../components/ui/button"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function ServicesPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  const brands = [
    { name: "ABB", logo: "/images/logos/abb.png" },
    { name: "MAN", logo: "/images/logos/man.png" },
    { name: "MITSUBISHI", logo: "/images/logos/mitsubishi.png" },
    { name: "KBB", logo: "/images/logos/kbb.png" },
    { name: "NAPIER", logo: "/images/logos/napier.png" },
    { name: "IHI", logo: "/images/logos/ihi.png" },
  ]

  return (
    <div className="min-h-screen bg-slate-950">
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <Image
            src="/images/industrial-maritime-engine-room.jpg"
            alt="Maritime Engine Room"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/80" /> 
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="container mx-auto px-4 relative z-10 text-center"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
            Turbocharger Services
            
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-16 font-light">
            Minimizing downtime with OEM-compliant turbocharger solutions
          </p>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="inline-flex flex-col items-center gap-3 text-white/50"
          >
            <span className="text-sm uppercase tracking-widest font-mono">Scroll to Explore</span>
            <ChevronDown className="h-8 w-8" />
          </motion.div>
        </motion.div>
      </section>

      <section className="py-32 bg-slate-200">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-1 h-24 bg-gradient-to-b from-[#00357a] to-blue-900 rounded-full" />
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-6 leading-tight">
                    Turbocharger Technical
                    <br />
                    Consultancy
                  </h2>
                  <p className="text-lg text-slate-700 leading-relaxed mb-6 text-justify">
                    We provide technical consultancy in compliance with manufacturer documentation for marine and power
                    plant turbocharger systems, covering disassembly, inspection, measurement, assembly, dynamic
                    balancing, maintenance, and overhaul processes.
                  </p>
                  <p className="text-lg text-slate-700 leading-relaxed text-justify">
                    Through fault analysis, performance assessment, and maintenance strategy development, we improve
                    operational reliability, reduce unplanned downtime, and support data-driven maintenance decisions.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/images/1.png"
                  alt="Precision Measurement"
                  className="w-full h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#0f172a]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group order-2 lg:order-1"
            >
              <div className="overflow-hidden rounded-2xl shadow-2xl border border-slate-700">
                <img
                  src="/images/2.png"
                  alt="Turbocharger Maintenance"
                  className="w-full h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8 order-1 lg:order-2"
            >
              <div className="flex items-start gap-4">
                <div className="w-1 h-24 bg-gradient-to-b from-slate-400 to-slate-600 rounded-full" />
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    Maintenance &<br />
                    Operational Support
                  </h2>
                  <p className="text-lg text-slate-300 leading-relaxed mb-6 text-justify">
                    Operational conditions and maintenance practices of turbocharger systems are technically evaluated
                    to improve overall efficiency. Through maintenance planning, process optimization, and targeted
                    technical improvements, unplanned downtime is reduced while system performance and equipment
                    reliability are sustainably enhanced.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-slate-200">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-1 h-24 bg-gradient-to-b from-[#00357a] to-blue-900 rounded-full" />
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-6 leading-tight">
                    Spare Parts Selection &<br />
                    Technical Compliance
                  </h2>
                  <p className="text-lg text-slate-700 leading-relaxed mb-6 text-justify">
                    Spare parts are selected based on manufacturer technical documentation, dimensional tolerances, and
                    operating conditions. Mechanical and functional compatibility with the system is technically
                    verified to ensure compliance with performance and safety requirements.
                  </p>
                  <p className="text-lg text-slate-700 leading-relaxed text-justify">
                    Through cost-performance analysis, alternative solutions are evaluated to support technical accuracy
                    and operational continuity during maintenance and overhaul processes.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/images/4.png"
                  alt="Spare Parts"
                  className="w-full h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-[#00357a] mb-6">
              Supported Turbocharger Manufacturers
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed">
            The turbocharger manufacturer brands for which we provide maintenance, repair, spare parts,
and technical consultancy services.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-8 gap-y-4 max-w-6xl mx-auto"
          >
            {brands.map((brand, index) => (
              <div key={index} className="flex items-center">
                <span className="text-3xl md:text-3xl font-black text-slate-500 hover:text-[#00357a] transition-colors duration-300 cursor-default tracking-tight">
                  {brand.name}
                </span>

                {index !== brands.length - 1 && (
                  <div className="w-2 h-2 rounded-full bg-[#00357a] ml-4 md:ml-8" />
                )}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-slate-100"
          >
            
          </motion.div>
        </div>
      </section>

      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ backgroundAttachment: "fixed" }}>
          <img src="/images/3.png" alt="Inventory" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/90 to-slate-900/50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Genuine & OEM Quality
              <br />
              Spare Parts
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed mb-12">
              Complete turbocharger spare parts supply with global delivery. Every component backed by our technical
              guarantee.
            </p>
            <Button
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0f172a] font-bold uppercase tracking-widest px-12 py-8 text-lg rounded-lg transition-all duration-300 group"
              asChild
            >
              <Link href="/products" className="flex items-center gap-3">
                VIEW SPARE PARTS
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-slate-200 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-[#00357a] mb-6">Need Technical Support?</h2>
            
            <p className="text-2xl text-slate-700 mb-12 max-w-2xl mx-auto font-light">
              Contact our expert team for turbocharger spare parts and technical consultancy services
            </p>
            
            <Button
              size="lg"
              className="bg-[#00357a] text-white hover:bg-[#002555] font-bold px-12 py-8 text-xl rounded-xl shadow-2xl hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/contact">Request Support</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}