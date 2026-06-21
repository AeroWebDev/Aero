const quickLinks = [
  { label: 'Home',     href: '#' },
  { label: 'About',    href: '#' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
]

const serviceLinks = [
  { label: 'UI/UX Design',       href: '#' },
  { label: 'Web Development',    href: '#' },
  { label: 'SEO & Performance',  href: '#' },
]

const legalLinks = [
  { label: 'Privacy Policy',   href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy',    href: '#' },
  { label: 'LinkedIn',         href: '#' },
  { label: 'GitHub',           href: '#' },
  { label: 'Twitter',          href: '#' },
]

function FooterLinkList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:underline transition-all text-sm"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default function Footer() {
  return (
    <footer className="bg-surface w-full py-section-padding-mobile md:py-section-padding-desktop border-t border-outline-variant/20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-gutter max-w-container-max-width mx-auto">

        {/* Brand column */}
        <div className="col-span-1">
          <div className="font-display-lg text-body-lg font-bold text-primary mb-4 flex items-center">
            <span className="material-symbols-outlined align-middle mr-2">token</span>
            Aero Studio
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6 text-sm">
            Crafting exceptional digital experiences for forward-thinking businesses.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">share</span>
            </a>
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">language</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-body-lg text-body-lg font-semibold text-on-surface mb-4">Quick Links</h4>
          <FooterLinkList items={quickLinks} />
        </div>

        {/* Services */}
        <div>
          <h4 className="font-body-lg text-body-lg font-semibold text-on-surface mb-4">Services</h4>
          <FooterLinkList items={serviceLinks} />
        </div>

        {/* Legal + Social */}
        <div>
          <h4 className="font-body-lg text-body-lg font-semibold text-on-surface mb-4">Legal</h4>
          <FooterLinkList items={legalLinks} />
        </div>

      </div>

      {/* Bottom copyright bar */}
      <div className="border-t border-outline-variant/10 mt-12 pt-8 px-gutter text-center">
        <p className="font-body-md text-body-md text-on-surface-variant text-sm">
          © 2024 Aero Studio. All rights reserved. Engineering the Digital Future.
        </p>
      </div>
    </footer>
  )
}
