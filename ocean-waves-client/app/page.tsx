"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  ArrowRight, ChevronDown, Globe, 
  Anchor, ClipboardCheck, Settings, TrendingUp, Users 
} from "lucide-react"

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToContent = () => {
    const element = document.getElementById("what-we-do")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
          <Image
            src="/images/turboreim10.png"
            alt="Ocean Waves Maritime Services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/30" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-3xl lg:text-5xl font-bold text-white mb-10 leading-[1.05]">
              <br />
              <span className="bg-gradient-to-r from-slate-100 via-white to-slate-100 bg-clip-text mb-10 text-transparent">
                OCEAN WAVES MARITIME SERVICES
              </span>
            </h1>
            
            <p className="text-2xl md:text-2xl text-slate-300 mb-12 font-light">
              "Your Reliable Partner in Turbocharger Solutions"
            </p>
          </div>
        </div>

        <button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer"
        >
          <ChevronDown className="h-8 w-8 text-white/50 hover:text-white transition-colors" />
        </button>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="py-32 bg-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold text-[#00357a] mb-6">What We Do?</h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed text-justify">
                Ocean Waves Maritime Service provides turbocharger spare parts supply and technical consultancy services for the marine and energy sectors, supporting maintenance, overhaul, and repair processes in compliance with manufacturer standards through reliable and sustainable technical solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-lg text-slate-700 leading-relaxed text-justify">
                  Original genuine and alternative spare parts supply is provided for ABB, MAN, KBB, Napier, Mitsubishi (MET), and IHI turbocharger brands, supporting maintenance, repair, and overhaul operations.
                </p>
              </div>
              <div>
                <p className="text-lg text-slate-700 leading-relaxed text-justify">
                  Technical service and consultancy are provided for turbochargers in full compliance with manufacturer technical documentation, supporting reliable and sustainable operational performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solutions Section */}
      <section id="Our-Solutions" className="py-32 bg-[#0f172a]">
        <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold text-slate-200 mb-6">Our Solutions</h2>
              <p className="text-xl text-slate-200">Spare Part and Services for Your Turbochargers</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
              {[
                {
                  title: "SPARE PARTS",
                  image: "/images/turbocharger-spare-parts-industrial-warehouse.jpg",
                  href: "/spare-parts",
                  description: "Original & OEM spare parts",
                },
                {
                  title: "SERVICE",
                  image: "/images/turbocharger-maintenance-service-technician.jpg",
                  href: "/services",
                  description: "24/7 global support",
                },
              ].map((item, index) => (
                <Link key={index} href={item.href} className="group relative">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-8">
                      <h3 className="text-4xl font-bold text-white mb-2 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-white/70 text-base">{item.description}</p>
                      <div className="mt-4 flex items-center gap-2 text-[#00357a] bg-white/90 w-fit px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="text-sm font-bold">Learn more</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
        </div>
      </section>

      {/* Why Choose Us Section - GÜNCELLENDİ: Sade, resimsiz ve boşluklar azaltıldı */}
      <section className="py-20 bg-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Başlık - Ortalanmış */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0f172a]">
                Why Choose <span className="text-[#00357a]">Ocean Waves?</span>
              </h2>
            </div>

            {/* Grid Yapısı (3 Sütun) - Resim kaldırıldı, sadece ikon ve metin */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              {[
                {
                  icon: Anchor, 
                  title: "Proven Expertise in Turbochargers",
                  description: "Specialized spare parts and consultancy for marine and energy sectors, ensuring reliable operations.",
                },
                {
                  icon: ClipboardCheck, 
                  title: "OEM-Compliant Turbocharger Services",
                  description: "Services performed strictly according to OEM standards and technical documentation for maximum safety.",
                },
                {
                  icon: Settings, 
                  title: "Genuine & Alternative Spare Parts ",
                  description: "Supply of original and high-quality alternative spare parts for leading OEM brands to support maintenance.",
                },
                {
                  icon: Globe, 
                  title: "Fast & Reliable Global Supply",
                  description: "Fast global sourcing and logistics capabilities to minimize downtime and operational disruptions.",
                },
                {
                  icon: Users, 
                  title: "Independent Technical Consultancy",
                  description: "Objective, manufacturer-compliant technical advice based on actual equipment condition.",
                },
                {
                  icon: TrendingUp, 
                  title: "Sustaniable & Cost Effective Solutions",
                  description: "Optimizing turbocharger performance and component life to reduce costs while maintaining quality.",
                },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-start p-6 bg-slate-100 rounded-2xl hover:shadow-md transition-shadow">
                  {/* İkon Kutusu */}
                  <div className="w-12 h-12 bg-[#00357a] rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  {/* İçerik */}
                  <h3 className="text-xl font-bold text-[#0f172a] mb-3">{item.title}</h3>
                  <p className="text-slate-700 text-justify leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Buton - Ortalanmış */}
            
          </div>
        </div>
      </section>
    </div>
  )
}