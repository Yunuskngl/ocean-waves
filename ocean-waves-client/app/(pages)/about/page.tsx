import { ArrowDown } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-900">

      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="/images/about-hero.png"
            alt="Ocean Waves Maritime Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-25">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
  Engineering Excellence
  <br />
  <span className="text-3xl md:text-4xl lg:text-4xl font-light text-slate-200/90 mt-2 block">
    in Turbocharger Solutions
  </span>
  <div className="h-1 w-24 bg-white mx-auto mt-6 rounded-full"></div>
</h1>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about" className="flex flex-col items-center text-white/70 hover:text-white transition-colors">
            <ArrowDown className="h-8 w-8" />
          </a>
        </div>
      </section>

      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 text-center">About Us</h2>

            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <p>
              We provide turbocharger spare parts supply and technical consultancy services
for marine and power plant applications. Our company is built upon strong
engineering expertise and hands-on industry experience acquired since 2016.
              </p>
              <p>
              We specialize in turbocharger maintenance, overhaul, inspection, and technical
reporting, with all activities carried out in full compliance with manufacturer
technical documentation and standards.
              </p>
              <p>
              Through reliable spare parts solutions and a disciplined technical approach, we
support our clients in improving operational efficiency, reducing unplanned
downtime, and ensuring long-term equipment reliability.
Our objective is to position ourselves as a trusted and technically competent
turbocharger solution partner for the maritime and energy industries.
              </p>
            </div>

            <div className="mt-12 text-center">
              
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4">

          <div className="flex flex-col gap-16 max-w-4xl mx-auto">
            
            {/* Vision */}
            <div className="border-l-4 border-orange-500 pl-8">
              <h3 className="text-3xl font-bold mb-2">Our Vision</h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                To be a globally referenced solution partner in the maritime and
                energy sectors through advanced engineering expertise, high
                technical competence, and sustainable turbocharger spare parts and
                technical consultancy services.
              </p>
            </div>

            {/* Mission */}
            <div className="border-l-4 border-cyan-500 pl-8">
              <h3 className="text-3xl font-bold mb-2">Our Mission</h3>
              {/* DEĞİŞİKLİK: Metin yığını yerine düzgün bir liste (ul/li) yapısı kuruldu */}
              <ul className="text-lg text-slate-300 leading-relaxed space-y-4 list-none">
                <li className="relative">
                  <span className="absolute -left-6 top-2 w-2 h-2 "></span>
                  Our mission is to deliver high-quality and reliable turbocharger spare parts solutions, supported by manufacturer-compliant technical consultancy, for the maritime and energy sectors. By leveraging advanced engineering expertise, technical accuracy, and timely execution, we aim to maximize operational efficiency and minimize unplanned downtime, while establishing long-term, strategic partnerships founded on technical excellence, transparency, quality, and continuous improvement.
                </li>
              </ul>
            </div>
            
          </div>
        </div>
      </section>


      <section className="py-24 bg-slate-100">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      {/* Başlık rengini proje rengine (#00357a) veya koyu slate rengine çekebilirsiniz */}
      <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Our Solutions</h2>
      <p className="text-xl text-slate-600">Spare Part and Services for your turbochargers</p>
    </div>

    {/* DEĞİŞİKLİKLER BURADA YAPILDI:
        1. md:grid-cols-3 -> md:grid-cols-2 (3 yerine 2 sütun yapıldı ki ortalansın)
        2. gap-8 -> gap-16 (Aralarındaki boşluk artırıldı)
        3. max-w-6xl -> max-w-4xl (Konteyner daraltıldı, böylece kartlar aşırı büyümez)
    */}
    <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
      
      {/* Parts Card */}
      <Link href="/products?category=Spare Parts" className="group">
        <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[4/5]">
          <img
            src="/images/turbocharger-spare-parts-industrial-warehouse.jpg"
            alt="Turbocharger Parts"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {/* Hover rengi marka laciverti (#00357a) veya beyaz kalacak şekilde ayarlandı */}
            <h3 className="text-3xl font-bold text-white group-hover:text-[#00357a] transition-colors">Spare Parts</h3>
          </div>
        </div>
      </Link>

      {/* Service Card */}
      <Link href="/services" className="group">
        <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[4/5]">
          <img
            src="/images/turbocharger-maintenance-service-technician.jpg"
            alt="Turbocharger Service"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-3xl font-bold text-white group-hover:text-[#00357a] transition-colors">
              Service
            </h3>
          </div>
        </div>
      </Link>
      
    </div>
  </div>
</section>

      
    </div>
  )
}
