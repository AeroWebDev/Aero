const services = [
  {
    icon: 'code',
    title: 'AI Code Assistant',
    description: 'Generate, explain, and refactor code instantly with AI.',
  },
  {
    icon: 'description',
    title: 'Smart Documentation',
    description: 'Automatically generate docs, READMEs, and API references.',
  },
  {
    icon: 'rocket_launch',
    title: 'Deploy Anywhere',
    description: 'One-click deployment to the cloud of your choice.',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-section-padding-mobile md:py-section-padding-desktop px-gutter relative z-10 bg-surface">

      {/* Radial glow blob */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 0%, rgba(255,78,124,0.15) 0%, rgba(255,78,124,0.05) 50%, transparent 100%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-container-max-width mx-auto relative z-10">

        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-label-mono text-label-mono text-primary uppercase tracking-widest mb-2 block">
            Our services
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Everything You Need to Build Modern Software
          </h2>
        </div>

        {/* 3 service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-8 card-glow transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 border border-primary/20">
                <span className="material-symbols-outlined text-primary">{service.icon}</span>
              </div>
              <h3 className="font-body-lg text-body-lg font-semibold text-on-surface mb-3">{service.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">{service.description}</p>
              <a href="#" className="font-label-mono text-label-mono text-primary flex items-center hover:underline">
                Learn More <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
