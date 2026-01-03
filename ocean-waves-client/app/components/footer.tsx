import Link from "next/link"
import { Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-ocean-blue-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-1">
          <div className="flex flex-col items-start justify-start">
            {/* Logo */}
            <div className="mb-1 -mt-12">
              <img
                src="/images/img-0448.png"
                alt="Ocean Waves Maritime Service"
                className="h-60 w-auto object-contain"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-slate-200 hover:text-white transition-colors text-sm font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/spare-parts"
                  className="text-slate-200 hover:text-white transition-colors text-sm font-medium"
                >
                  Spare Parts
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-slate-200 hover:text-white transition-colors text-sm font-medium"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-200 hover:text-white transition-colors text-sm font-medium">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Contact Information</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+905518651151" className="text-slate-200 hover:text-white transition-colors text-sm">
                    +90 551 865 11 51
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href="mailto:info@oceanwavesms.com"
                    className="text-slate-200 hover:text-white transition-colors text-sm"
                  >
                    info@oceanwavesms.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div className="text-slate-200 text-sm leading-relaxed">
                  Altunay Sok. No:33 Çakmak İş Merkezi
                  <br />
                  Kat: 6 No: 24 Tuzla, Istanbul
                </div>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Follow Us</h3>
            <div className="flex gap-4 mb-8">
              <a
                href="https://linkedin.com/company/oceanwavesms"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2.5 rounded-lg hover:bg-white/20 transition-all text-white border border-white/10"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/oceanwavesmaritime"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2.5 rounded-lg hover:bg-white/20 transition-all text-white border border-white/10"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>            
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-slate-400 text-xs">
            © {new Date().getFullYear()} Ocean Waves Maritime Service. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}