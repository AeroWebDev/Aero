const featureCards = [
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

const checklist = [
  'Context-aware suggestions',
  'Multi-language support',
  'Secure & private by design',
]

export default function Features() {
  return (
    <section className="py-section-padding-mobile md:py-section-padding-desktop px-gutter relative z-10 bg-surface">

      {/* Background grid decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] -z-10 pointer-events-none opacity-50">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv1yCXffQGgpcXfaLY7jPgLYEaaLvnKguIzZq5QFbsh5NenG-4d00muSwHWqQmyTF94gClDtUkmENTg5HZwz4u1o6QQgkUuGt0gunStlm3meiGUQOP32wIUb8D7G28LPR_mhNLF7y0e3XxR4OoTIhF1otEUZRKpL0glu5kCHfYfcmDZdOAhFyJSeTP9toqgWvFtE2sGPT_cqQDL6mI0aZZ33sLCrSaSlhIw2S5LVQBZh8RLqoctXVa2MAtCcVT450qtotR1-C_79yg"
          alt=""
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="max-w-container-max-width mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-label-mono text-label-mono text-primary-container uppercase tracking-widest mb-2 block">
            FEATURES
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Everything You Need to Build Modern Software
          </h2>
        </div>

        {/* 3 feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {featureCards.map((card) => (
            <div
              key={card.title}
              className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-8 card-glow transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 border border-primary/20">
                <span className="material-symbols-outlined text-primary-container">{card.icon}</span>
              </div>
              <h3 className="font-body-lg text-body-lg font-semibold text-on-surface mb-3">{card.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">{card.description}</p>
              <a href="#" className="font-label-mono text-label-mono text-primary-container flex items-center hover:underline">
                Learn more <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
              </a>
            </div>
          ))}
        </div>

        {/* AI spotlight: code block + feature list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">

          {/* Left: code snippet + tip */}
          <div className="space-y-4">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-2xl">
              {/* Code editor top bar */}
              <div className="bg-surface-container-high px-4 py-2 flex items-center justify-between border-b border-outline-variant/20">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-xs font-label-mono text-on-surface-variant">main.py</span>
              </div>
              {/* Code */}
              <div className="p-6 font-label-mono text-sm text-on-surface-variant">
                <pre><code>
<span className="text-primary-container">def</span> <span className="text-tertiary">greet</span>(name):{'\n'}
{'    '}message = <span className="text-primary">{`f"Hello, {'{name}'}! Welcome to Nexus Dev."`}</span>{'\n'}
{'    '}<span className="text-primary-container">return</span> message{'\n'}
{'\n'}
<span className="text-primary-container">if</span> __name__ == <span className="text-primary">"__main__"</span>:{'\n'}
{'    '}<span className="text-tertiary">print</span>(greet(<span className="text-primary">"Developer"</span>))
                </code></pre>
              </div>
            </div>
            {/* AI tip */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-center space-x-3">
              <span className="material-symbols-outlined text-primary-container">lightbulb</span>
              <p className="font-body-md text-body-md text-on-surface">
                AI Tip: Consider adding type hints for better readability.
              </p>
            </div>
          </div>

          {/* Right: text + checklist */}
          <div className="md:pl-12">
            <span className="font-label-mono text-label-mono text-primary-container uppercase tracking-widest mb-4 block">
              POWERED BY AI
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-6">
              AI That Understands Developers
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
              From autocompletions to full feature generation, Nexus Dev helps you stay in
              the flow and ship faster.
            </p>
            <ul className="space-y-4">
              {checklist.map((item) => (
                <li key={item} className="flex items-center text-on-surface">
                  <span className="material-symbols-outlined text-primary-container mr-3">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}
