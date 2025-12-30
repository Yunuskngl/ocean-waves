"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { Product } from "../types/product"
import useProductStore from "../store/product-store"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const pathname = usePathname()
  const products = useProductStore((state) => state.products);
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navbarBg = isHomePage ? (isScrolled ? "bg-slate-900 shadow-lg" : "bg-transparent") : "bg-slate-900 shadow-lg"
  const textColor = isHomePage && !isScrolled ? "text-white" : "text-white"

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarBg}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/images/img-0448.png"
              alt="Ocean Waves Maritime"
              className="h-32 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className={`text-xl font-semibold transition-colors hover:text-cyan-400 ${textColor}`}>
              Home
            </Link>

            <Link href="/about" className={`text-xl font-semibold transition-colors hover:text-cyan-400 ${textColor}`}>
              About Us
            </Link>

            {/* SPARE PARTS DROPDOWN */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Link
                href="/spare-parts"
                className={`flex items-center gap-1 text-xl font-semibold transition-colors hover:text-cyan-400 ${textColor}`}
              >
                Spare Parts
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </Link>

              {/* Dropdown Content */}
              {isDropdownOpen && (
                <div 
                    className="absolute top-full left-0 mt-0 w-64 bg-slate-900 border border-slate-700 rounded-b-lg shadow-xl py-2 animate-in fade-in slide-in-from-top-2"
                >
                  {products.map((cat:Product) => (
                    <Link
                      key={cat.id}
                      href={`/spare-parts/${cat.id}`}
                      className="block px-6 py-3 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border-b border-slate-800 last:border-0"
                    >
                      {cat.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/services"
              className={`text-xl font-semibold transition-colors hover:text-cyan-400 ${textColor}`}
            >
              Services
            </Link>

            <Link
              href="/contact"
              className={`text-xl font-semibold transition-colors hover:text-cyan-400 ${textColor}`}
            >
              Contact
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-4"></div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className={`h-6 w-6 ${textColor}`} /> : <Menu className={`h-6 w-6 ${textColor}`} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-700 bg-slate-900">
            <div className="flex flex-col gap-4 px-4">
              <Link href="/" className="text-xl font-semibold hover:text-cyan-400 text-white">
                Home
              </Link>
              <Link href="/about" className="text-xl font-semibold hover:text-cyan-400 text-white">
                About Us
              </Link>
              
              {/* Mobil Menü - Spare Parts */}
              <div className="space-y-2">
                <Link href="/spare-parts" className="text-xl font-semibold hover:text-cyan-400 text-white block">
                  Spare Parts
                </Link>
                <div className="pl-4 border-l-2 border-slate-700 space-y-2 mt-2">
                    {products.map((cat:Product) => (
                        <Link 
                            key={cat.id} 
                            href={`/spare-parts`}
                            className="block text-slate-400 hover:text-cyan-400"
                        >
                            {cat.title}
                        </Link>
                    ))}
                </div>
              </div>

              <Link href="/services" className="text-xl font-semibold hover:text-cyan-400 text-white">
                Services
              </Link>
              <Link href="/contact" className="text-xl font-semibold hover:text-cyan-400 text-white">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}