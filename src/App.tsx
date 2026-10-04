import { Advanced } from './components/Advanced'
import { Closing } from './components/Closing'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Frameworks } from './components/Frameworks'
import { Hero } from './components/Hero'
import { Install } from './components/Install'
import { Navbar } from './components/Navbar'
import { Playground } from './components/Playground'
import { Usage } from './components/Usage'

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-paper">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
      >
        跳到主要内容
      </a>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Install />
        <Usage />
        <Playground />
        <Frameworks />
        <Advanced />
        <Closing />
      </main>
      <Footer />
    </div>
  )
}
