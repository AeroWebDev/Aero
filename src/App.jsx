import './config.css'
import './index.css'

import Navbar   from './components/Navbar'
import Hero     from './components/Hero'
import Features from './components/Features'
import Services from './components/Services'
import Projects from './components/Projects'
import Contact  from './components/Contact'
import Footer   from './components/Footer'

export default function App() {
  return (
    <div className="antialiased">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
