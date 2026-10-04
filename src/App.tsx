import { lazy, Suspense } from 'react'
import { Advanced } from './components/Advanced'
import { Closing } from './components/Closing'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Frameworks } from './components/Frameworks'
import { Hero } from './components/Hero'
import { Install } from './components/Install'
import { Navbar } from './components/Navbar'
import { Section, SectionHeading } from './components/Section'
import { Usage } from './components/Usage'

const Playground = lazy(() =>
  import('./components/Playground').then((m) => ({ default: m.Playground })),
)

function PlaygroundSkeleton() {
  return (
    <Section id="playground" dark>
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative">
        <SectionHeading
          dark
          eyebrow="Playground"
          title="别只看代码，直接上手玩"
          lead="下面是一个真实的 gridstack.js 实例——不是录屏，也不是静态图。拖动卡片移动位置、拉右下角缩放、从左侧面板拖入新部件、把卡片拖到垃圾桶删除，右侧 JSON 会实时跟着变。"
        />
        <div className="flex min-h-120 items-center justify-center rounded-2xl border border-white/10 bg-white/5 font-mono text-sm text-mid">
          <span className="animate-pulse-dot mr-2.5 size-2 rounded-full bg-accent" />
          正在加载网格交互环境…
        </div>
      </div>
    </Section>
  )
}

export default function App() {
  return (
    <div className="min-h-dvh bg-paper">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-60 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
      >
        跳到主要内容
      </a>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Install />
        <Usage />
        <Suspense fallback={<PlaygroundSkeleton />}>
          <Playground />
        </Suspense>
        <Frameworks />
        <Advanced />
        <Closing />
      </main>
      <Footer />
    </div>
  )
}
