import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="bg-[var(--color-surface-alt)] min-h-screen pb-24">
       <div className="bg-gray-900 border-b border-gray-800 section-spacing !pb-16 text-center">
        <div className="max-w-4xl mx-auto px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Contact Us</h1>
          <p className="text-lg text-gray-400">Our premium support team is available 24/7 to assist with your rental queries.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid md:grid-cols-5 gap-8">
          
          {/* Contact Details */}
          <div className="md:col-span-2 space-y-6">
            <div className="card-premium p-8">
              <h3 className="text-xl font-bold mb-8 tracking-tight">Corporate Headquarters</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="text-[var(--color-primary)]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-widest text-gray-500 uppercase mb-1">Address</h4>
                    <p className="text-gray-900 font-medium leading-relaxed">
                      123 Ermou Street<br />
                      Syntagma Square<br />
                      Athens, Greece 10563
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="text-[var(--color-primary)]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-widest text-gray-500 uppercase mb-1">Phone</h4>
                    <p className="text-gray-900 font-medium">+30 210 123 4567</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="text-[var(--color-primary)]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-widest text-gray-500 uppercase mb-1">Email</h4>
                    <p className="text-gray-900 font-medium">support@islanddrive.gr</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-premium p-8 bg-[var(--color-primary-light)] border-[var(--color-primary)]/20">
               <div className="flex items-center gap-3 mb-4">
                 <Clock className="text-[var(--color-primary)]" size={24} />
                 <h3 className="text-lg font-bold text-gray-900">Support Hours</h3>
               </div>
               <p className="text-gray-700 leading-relaxed font-medium">
                 Phone support is available 24/7 for active rentals. <br/><br/>
                 For general inquiries or reservations, our administrative office operates Monday–Friday, 09:00 - 18:00 (EET).
               </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3">
            <div className="card-premium p-8 md:p-12">
              <h2 className="text-2xl font-extrabold tracking-tight mb-2">Send us a message</h2>
              <p className="text-gray-500 mb-8">Fill out the form below and our team will get back to you within 24 hours.</p>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">First Name</label>
                    <input type="text" className="w-full border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition bg-[var(--color-surface-alt)] font-medium" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Last Name</label>
                    <input type="text" className="w-full border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition bg-[var(--color-surface-alt)] font-medium" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                  <input type="email" className="w-full border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition bg-[var(--color-surface-alt)] font-medium" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Message</label>
                  <textarea rows={5} className="w-full border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition bg-[var(--color-surface-alt)] font-medium resize-none" placeholder="How can we help you?"></textarea>
                </div>

                <button type="button" className="btn-primary w-full text-lg !py-4 mt-4">
                  Send Message
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
