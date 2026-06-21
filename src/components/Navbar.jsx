import { useState } from 'react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-surface/80 backdrop-blur-md fixed top-0 w-full z-50 shadow-sm">
      <div className="flex justify-between items-center px-gutter py-4 max-w-container-max-width mx-auto">

        {/* ── Logo ── */}
        <div className="font-display-lg text-headline-md font-bold text-on-surface tracking-tight">
          <span className="text-primary material-symbols-outlined align-middle mr-2">token</span>A
        </div>

        {/* ── Desktop nav links ── */}
        <div className="hidden md:flex space-x-8">
          <a href="#" className="font-body-md text-body-md text-primary font-semibold border-b-2 border-primary pb-1 duration-200 ease-in-out">
            Home
          </a>
          <a href="#services" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-300 hover:bg-primary/10 rounded-lg px-2 py-1">
            Services
          </a>
          <a href="#projects" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-300 hover:bg-primary/10 rounded-lg px-2 py-1">
            Projects
          </a>
          <a href="#" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-300 hover:bg-primary/10 rounded-lg px-2 py-1">
            Experience
          </a>
          <a href="#contact" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-300 hover:bg-primary/10 rounded-lg px-2 py-1">
            Contact Us
          </a>
        </div>

        {/* ── Desktop CTA ── */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="font-body-md text-body-md bg-primary-container text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-semibold shadow-[0_0_15px_rgba(255,78,124,0.3)]">
            Get in Touch
          </button>
        </div>

        {/* ── Mobile hamburger ── */}
        <div className="md:hidden">
          <span
            className="material-symbols-outlined text-primary cursor-pointer select-none"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? 'close' : 'menu'}
          </span>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      {mobileOpen && (
        <div className="md:hidden px-gutter pb-4 flex flex-col space-y-3 bg-surface border-t border-outline-variant/20">
          <a href="#"         className="text-primary font-semibold font-body-md text-body-md py-2">Home</a>
          <a href="#services" className="text-on-surface-variant hover:text-primary font-body-md text-body-md py-2 transition-colors">Services</a>
          <a href="#projects" className="text-on-surface-variant hover:text-primary font-body-md text-body-md py-2 transition-colors">Projects</a>
          <a href="#"         className="text-on-surface-variant hover:text-primary font-body-md text-body-md py-2 transition-colors">Experience</a>
          <a href="#contact"  className="text-on-surface-variant hover:text-primary font-body-md text-body-md py-2 transition-colors">Contact Us</a>
          <button className="bg-primary-container text-white font-semibold py-2 px-6 rounded-lg w-fit">
            Get in Touch
          </button>
        </div>
      )}
    </nav>
  )
}
