const projects = [
  {
    title: 'Fintech Pro',
    subtitle: 'Financial Dashboard Platform',
    year: '2024',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAmQRF83ZCPKqlgJ0vwONbu68BWBA7z9ur8MY27p1dhkz0-XnSN_MfCN3fnyv411tdC0zKwsJGatqkPVUVxOfq0WYFEDMyp_tA43x9rYz72q95Pgnlnw2X7hQJWrdRmUGs3_ht5ipIBAEedakdNE1a3GLGx2tGir8iS35mC_zXRSuFUimpxFhjwHfh1LYnazP-9SLDAgJPrJtKyicNxbR1jenyf_5Rc_C_CMGa1QHr1YzlG5AGJ9u2p3ZEnsxNI79AydrniXlaCOliQ',
    alt: 'Fintech Pro — Financial Dashboard Platform',
  },
  {
    title: 'AI Analytics Hub',
    subtitle: 'Machine Learning Data App',
    year: '2023',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDT2vjHwrLeDxhlWlW7aYe-l44MEWHiCLs4s_JJHiU2MQh3fr_MeIJKqEU8QoDfXjRqtY0SG-Fl1kiBHdZQyRGztR7ivETcNtVLr4cRY7ms-eKW7B33uifsgNJqveUk9iaaXuDjBlcHr7N_oIaA8OBjezpUnEVvXvmXUhUZxlI-JJfnR5HpE84q94Mqsqub8r87JpTgw9AUGqP8vgjXYa4LAcl9B11p8qz18Q5GrOCer8V0mFKGnAu4Kre9DpcuSiyiq1sr-39fQ3Tv',
    alt: 'AI Analytics Hub — Machine Learning Data App',
  },
  {
    title: 'Nexus Portal',
    subtitle: 'Enterprise DevOps Engine',
    year: '2023',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAdhI4GERF3fJHFaHFujTLqwdjMtgTqeskH0wo2uleKD9J62TTd1TnVWZFMeg4qPyZaJ8N3Rq52_oOUTlxv4tMeu0ZrHFbNLI2K9hisQS3iBOIQP1pExXvrv3m4TwZE_h65buoKBanuVKXklyiylJ208ACKtFvVGfrrVm0L4350mSgMxkGd6TdFIs5HMnQD-lDCr4cnZ7jM0tExH0TvQwVnACB3ELxG4ioAoTrSERD7XlQDJXuLM_-kPCyxA_npj0MXQfkpCmACEdER',
    alt: 'Nexus Portal — Enterprise DevOps Engine',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-section-padding-mobile md:py-section-padding-desktop px-gutter relative z-10 bg-surface">
      <div className="max-w-container-max-width mx-auto">

        {/* Section header */}
        <div className="flex justify-between items-end mb-12 border-b border-outline-variant/20 pb-4">
          <div>
            <span className="font-label-mono text-label-mono text-primary uppercase tracking-widest mb-2 block">
              Featured Work
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">Selected Projects</h2>
          </div>
          <a
            href="#"
            className="hidden md:flex font-label-mono text-label-mono text-on-surface-variant hover:text-primary items-center transition-colors"
          >
            View All Work <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
          </a>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.title} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl mb-4 border border-outline-variant/20 aspect-video">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={project.image}
                  alt={project.alt}
                />
                <div className="absolute inset-0 bg-surface/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-body-lg text-body-lg font-semibold text-on-surface mb-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">{project.subtitle}</p>
                </div>
                <span className="font-label-mono text-label-mono text-xs border border-outline-variant rounded-full px-2 py-1 text-on-surface-variant">
                  {project.year}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
