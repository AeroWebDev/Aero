export default function Hero() {
  return (
    <header className="relative pt-40 pb-section-padding-mobile md:pb-section-padding-desktop px-gutter max-w-container-max-width mx-auto text-center z-10 min-h-[80vh] md:grid md:grid-cols-2 md:text-left md:items-center md:gap-gutter">

      {/* ── Left: Headline + CTAs ── */}
      <div className="flex flex-col md:items-start items-center">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-6">
          Engineering the <br />
          <span className="text-primary-container drop-shadow-[0_0_10px_rgba(255,78,124,0.5)]">
            Digital Future
          </span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-10">
          We Build Websites, Apps &amp; Digital Solutions.
        </p>
        <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button className="bg-primary-container text-white font-semibold py-3 px-8 rounded-lg shadow-[0_0_20px_rgba(255,78,124,0.4)] hover:shadow-[0_0_30px_rgba(255,78,124,0.6)] transition-all">
            Start a Project
          </button>
          <button className="border border-outline-variant text-on-surface hover:border-primary hover:text-primary py-3 px-8 rounded-lg transition-all flex items-center">
            View Our Work
            <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* ── Right: Terminal window decoration ── */}
      <div className="mt-20 md:mt-0 relative w-full max-w-3xl mx-auto h-64 border border-surface-variant rounded-xl bg-surface-container-low overflow-hidden shadow-2xl">
        {/* Traffic light dots */}
        <div className="absolute top-4 left-4 flex space-x-2 z-20">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface-container-highest to-surface-container-low opacity-50" />
        {/* Terminal output */}
        <div className="absolute left-4 font-label-mono text-label-mono text-primary/70 top-10">
          &gt; init system...<br />
          &gt; connecting to node_01...<br />
          &gt; status: optimal
        </div>
        {/* Decorative icon */}
        <div className="absolute right-10 bottom-10">
          <span className="material-symbols-outlined text-primary text-6xl opacity-20">memory</span>
        </div>
      </div>

    </header>
  )
}
