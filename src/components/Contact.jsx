import { useState } from 'react'

const contactInfo = [
  { icon: 'mail',        text: 'hello@aerostudio.io' },
  { icon: 'location_on', text: '123 Innovation Drive, Tech District' },
  { icon: 'call',        text: '+1 (555) 123-4567' },
]

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', budget: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-section-padding-mobile md:py-section-padding-desktop px-gutter relative z-10 bg-surface">
      <div className="max-w-4xl mx-auto bg-surface-container-low border border-outline-variant/30 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl">

        {/* ── Left: contact info panel ── */}
        <div className="bg-surface-container-highest p-10 md:w-2/5 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Get in Touch</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8">
              We&apos;re here to discuss your project and bring your ideas to life with premium design &amp; development.
            </p>
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div key={item.icon} className="flex items-center">
                  <span className="material-symbols-outlined text-primary mr-4">{item.icon}</span>
                  <span className="font-body-md text-body-md text-on-surface">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: contact form ── */}
        <div className="p-10 md:w-3/5">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4 text-center">
              <span className="material-symbols-outlined text-primary-container text-5xl">check_circle</span>
              <h3 className="font-headline-md text-headline-md text-on-surface">Message Sent!</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                We&apos;ll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Your Name *"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface border border-outline-variant/50 rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors font-body-md placeholder-on-surface-variant/50"
                />
              </div>
              <div>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="Email Address *"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface border border-outline-variant/50 rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors font-body-md placeholder-on-surface-variant/50"
                />
              </div>
              <div>
                <input
                  id="contact-budget"
                  name="budget"
                  type="text"
                  placeholder="Project Budget (Optional)"
                  value={form.budget}
                  onChange={handleChange}
                  className="w-full bg-surface border border-outline-variant/50 rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors font-body-md placeholder-on-surface-variant/50"
                />
              </div>
              <div>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your project..."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-surface border border-outline-variant/50 rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors font-body-md placeholder-on-surface-variant/50 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-container text-white font-semibold py-3 px-8 rounded-lg shadow-[0_0_15px_rgba(255,78,124,0.3)] hover:shadow-[0_0_25px_rgba(255,78,124,0.5)] transition-all mt-4"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  )
}
