"use client"

import type React from "react"
import { useState } from "react"
import { Mail, MapPin, Send, Linkedin, Instagram, Globe, Phone } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simülasyon amaçlı
    setTimeout(() => {
        setSubmitted(true)
        setIsSubmitting(false)
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
        setTimeout(() => setSubmitted(false), 3000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-[#0f172a]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Get in Touch</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light">
            24/7 Global Support for Turbocharges
          </p>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Left Column - Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-[#0f172a] mb-6">Contact Information</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Our team is ready to assist you with technical consultancy, spare parts, and service inquiries around the clock.
                  </p>
                </div>

                {/* TÜM İLETİŞİM BİLGİLERİ AYNI DÜZENDE */}
                <div className="space-y-8">
                  
                  {/* 1. Hotline (DÜZENLENDİ) */}
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 text-[#00357a]">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm mb-1 font-medium">24/7 Telephone Number</p>
                      <a
                        href="tel:+905518651151"
                        className="text-lg text-slate-900 font-semibold hover:text-[#00357a] transition-colors"
                      >
                        +90 551 865 11 51
                      </a>
                    </div>
                  </div>

                  {/* 2. Email */}
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 text-[#00357a]">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm mb-1 font-medium">Email Us</p>
                      <a
                        href="mailto:burakbeyoglu@oceanwavesms.com"
                        className="text-lg text-slate-900 font-semibold hover:text-[#00357a] transition-colors"
                      >
                        info@oceanwavesms.com
                      </a>
                    </div>
                  </div>

                  {/* 3. Website */}
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 text-[#00357a]">
                      <Globe className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm mb-1 font-medium">Visit Website</p>
                      <a
                        href="https://www.oceanwavesms.com"
                        className="text-lg text-slate-900 font-semibold hover:text-[#00357a] transition-colors"
                      >
                        www.oceanwavesms.com
                      </a>
                    </div>
                  </div>

                  {/* 4. Address */}
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 text-[#00357a]">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm mb-1 font-medium">Headquarters</p>
                      <p className="text-slate-900 font-medium leading-relaxed">
                        Aydınlı Mah. Altunay Sok. No:33
                        <br />
                        Çakmak İş Merkezi, Kat: 6 No: 24
                        <br />
                        Tuzla, Istanbul, Turkey
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-8 border-t border-slate-200">
                  <div className="flex gap-4">
                    <a
                      href="https://linkedin.com/company/oceanwavesms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all duration-300"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="https://instagram.com/oceanwavesmaritime"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C] transition-all duration-300"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-10 shadow-lg">
                <h2 className="text-2xl font-bold text-[#0f172a] mb-2">Send Inquiry</h2>
                <p className="text-slate-500 mb-8">
                  Fill out the form below and our team will respond within 24 hours.
                </p>

                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center h-full flex flex-col justify-center items-center">
                    <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-4">
                      <Send className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Inquiry Sent Successfully</h3>
                    <p className="text-slate-600">We will contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* ROW 1: Name & Email */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-700 font-medium">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="h-12 border-slate-300 focus:border-[#00357a] focus:ring-[#00357a]/20"
                          placeholder="Burak Beyoglu"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-700 font-medium">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="h-12 border-slate-300 focus:border-[#00357a] focus:ring-[#00357a]/20"
                          placeholder="burakbeyoglu@example.com"
                        />
                      </div>
                    </div>

                    {/* ROW 2: Phone & Subject */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-slate-700 font-medium">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="h-12 border-slate-300 focus:border-[#00357a] focus:ring-[#00357a]/20"
                          placeholder="+90 ..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-slate-700 font-medium">
                          Subject *
                        </Label>
                        <Select
                          required
                          value={formData.subject}
                          onValueChange={(value) => setFormData({ ...formData, subject: value })}
                        >
                          <SelectTrigger className="h-12 border-slate-300 focus:border-[#00357a] focus:ring-[#00357a]/20">
                            <SelectValue placeholder="Select Topic" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="quote">Request Quote</SelectItem>
                            <SelectItem value="technical">Technical Support</SelectItem>
                            <SelectItem value="spare-parts">Spare Parts Inquiry</SelectItem>
                            <SelectItem value="service">Service Request</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* ROW 3: Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-slate-700 font-medium">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="border-slate-300 focus:border-[#00357a] focus:ring-[#00357a]/20 resize-none p-4"
                        placeholder="Please provide details about your inquiry..."
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-[#00357a] hover:bg-[#002555] text-white font-bold uppercase tracking-wide h-14 text-base transition-all duration-300 shadow-lg hover:shadow-xl"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Send className="h-5 w-5" />
                          SEND INQUIRY
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[450px] bg-slate-200 border-t border-slate-300">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3014.6565786835697!2d29.36247907654929!3d40.83226497137537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cadb1a55555555%3A0x1234567890abcdef!2sAyd%C4%B1nl%C4%B1%2C%20Altunay%20Sk.%20No%3A33%2C%2034953%20Tuzla%2F%C4%B0stanbul!5e0!3m2!1sen!2str!4v1703678000000!5m2!1sen!2str"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(20%) contrast(1.1)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ocean Waves Maritime Services Location"
        />
      </section>
    </div>
  )
}