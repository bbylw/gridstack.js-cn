import { motion, useReducedMotion } from 'motion/react'
import { memo } from 'react'

const KEYWORDS = [
  '纯 TypeScript',
  '零外部依赖',
  '12 列网格',
  '响应式断点',
  '移动端触摸',
  '嵌套子网格',
  '原生打印',
  'React · Vue · Angular',
]

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="top"
      className="grain relative isolate overflow-hidden bg-ink pt-28 pb-0 text-paper"
    >
      <div
        aria-hidden="true"
        className="bg-blueprint-dark absolute inset-0 opacity-70"
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-32 size-130 rounded-full bg-accent/20 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-24 size-105 rounded-full bg-blue/12 blur-[120px]"
      />

      <div className="relative mx-auto grid w-full max-w-300 items-center gap-14 px-5 pt-10 pb-20 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        {/* ---- copy ---- */}
        <div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/5 px-3 py-1.5 font-mono text-[11px] tracking-wide text-mid"
          >
            <span className="relative flex size-1.5">
              <span className="animate-pulse-dot absolute inline-flex size-1.5 rounded-full bg-green" />
            </span>
            纯 TypeScript · 无外部依赖 · 当前 v14
          </motion.div>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2.6rem] leading-[1.05] font-semibold text-balance sm:text-6xl lg:text-[4.1rem]"
          >
            拖拽、多列、响应式
            <br />
            <span className="text-accent">仪表盘布局</span>
            从未如此简单
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-[56ch] text-base leading-relaxed text-mid sm:text-lg"
          >
            移动端友好的现代网格布局库：用最少的代码搭建可拖拽、可缩放、多列、响应式的仪表盘。灵感来自已停止维护的
            gridster，倾注热爱打造。
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#install"
              className="group inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:bg-accent/90 active:scale-[0.97]"
            >
              开始安装使用
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="https://gridstackjs.com/demo/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-medium text-paper transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              查看在线演示
            </a>
          </motion.div>

          <motion.dl
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-6"
          >
            {[
              { k: '0', v: '外部依赖' },
              { k: '12', v: '默认列数' },
              { k: '3', v: '内置框架封装' },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-display text-3xl font-semibold text-paper">
                  {s.k}
                </dt>
                <dd className="mt-1 font-mono text-[11px] tracking-wide text-mid">
                  {s.v}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ---- mock dashboard ---- */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <MockDashboard />
          <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-white/12 bg-ink-soft/90 px-4 py-3 backdrop-blur-md sm:block">
            <p className="font-mono text-[10px] tracking-widest text-mid">
              GRIDSTACK.INIT()
            </p>
            <p className="mt-0.5 font-mono text-xs text-green">
              ✓ 12 列 · 就绪
            </p>
          </div>
        </motion.div>
      </div>

      {/* ---- keyword marquee ---- */}
      <div className="relative border-t border-white/10 py-5">
        <div className="mask-fade-x flex overflow-hidden">
          {/* the trailing `pr-10` on each item (rather than a gap on the
              track) makes the two copies exactly equal in width, so the
              -50% marquee loop is seamless. */}
          <div
            aria-hidden="true"
            className="animate-marquee flex shrink-0 items-center"
          >
            {[...KEYWORDS, ...KEYWORDS].map((k, i) => (
              <span
                key={`${k}-${i}`}
                className="flex shrink-0 items-center gap-10 pr-10 font-mono text-xs tracking-wide whitespace-nowrap text-mid"
              >
                {k}
                <span className="size-1 rounded-full bg-accent/60" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** A non-interactive, CSS-animated impression of a gridstack dashboard. */
const MockDashboard = memo(function MockDashboard() {
  return (
    <div className="contain-paint relative overflow-hidden rounded-2xl border border-white/12 bg-ink-soft/70 p-3 shadow-diffuse backdrop-blur-sm">
      <div className="mb-3 flex items-center gap-2 px-1">
        <span className="size-2 rounded-full bg-accent/70" />
        <span className="size-2 rounded-full bg-green/60" />
        <span className="size-2 rounded-full bg-blue/60" />
        <span className="ml-2 font-mono text-[10px] tracking-wide text-mid">
          dashboard.grid-stack
        </span>
        <span className="ml-auto font-mono text-[10px] text-mid/70">
          column: 12
        </span>
      </div>

      {/* 12-col blueprint underlay */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="bg-blueprint-dark absolute inset-0 rounded-lg opacity-50"
        />
        <div className="relative grid grid-cols-6 gap-2.5">
          {/* KPI */}
          <div className="animate-drift-a col-span-2 rounded-lg border border-white/10 bg-ink/70 p-3">
            <p className="font-mono text-[9px] tracking-widest text-mid">
              REVENUE
            </p>
            <p className="mt-1 font-display text-xl font-semibold text-paper">
              ¥48.2k
            </p>
            <p className="font-mono text-[10px] text-green">▲ 12.4%</p>
          </div>

          {/* chart */}
          <div className="col-span-4 rounded-lg border border-white/10 bg-ink/70 p-3">
            <p className="font-mono text-[9px] tracking-widest text-mid">
              TRAFFIC
            </p>
            <div className="mt-2 flex h-12 items-end gap-1">
              {[40, 65, 48, 82, 58, 95, 70, 88, 54, 76, 62, 90].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 origin-bottom rounded-t-xs bg-linear-to-t from-accent/40 to-accent"
                  style={{
                    height: `${h}%`,
                    animation: `bar-rise 0.8s cubic-bezier(0.16,1,0.3,1) ${
                      i * 60
                    }ms both`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* status list — the drifting widget */}
          <div className="animate-drift-b col-span-3 rounded-lg border border-accent/30 bg-ink/70 p-3">
            <div className="flex items-center gap-2">
              <span className="animate-pulse-dot size-1.5 rounded-full bg-green" />
              <p className="font-mono text-[9px] tracking-widest text-mid">
                LIVE NODES
              </p>
            </div>
            <ul className="mt-2 space-y-1.5">
              {['api-gateway', 'worker-01', 'cache'].map((n, i) => (
                <li
                  key={n}
                  className="flex items-center justify-between font-mono text-[10px] text-mid"
                >
                  <span className="text-paper/80">{n}</span>
                  <span className="text-green/80">
                    {['12ms', '8ms', '3ms'][i]}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* terminal */}
          <div className="col-span-3 rounded-lg border border-white/10 bg-ink/70 p-3">
            <p className="font-mono text-[9px] tracking-widest text-mid">
              CONSOLE
            </p>
            <pre className="mt-1.5 overflow-hidden font-mono text-[10px] leading-relaxed text-blue/90">
              <span className="text-mid">$</span> grid.load(data)
              {'\n'}
              <span className="text-green">✓ saved</span>
            </pre>
          </div>

          {/* mini grid preview */}
          <div className="col-span-6 rounded-lg border border-white/10 bg-ink/70 p-3">
            <div className="flex items-center gap-2">
              <p className="font-mono text-[9px] tracking-widest text-mid">
                SERIALIZED
              </p>
              <span className="ml-auto font-mono text-[9px] text-accent">
                [{"{x, y, w, h}"}]
              </span>
            </div>
            <div className="mt-2 grid grid-cols-12 gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  className="h-1.5 rounded-full bg-white/12"
                  style={{ animationDelay: `${i * 80}ms` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* animated pointer: drag gesture */}
        <div
          aria-hidden="true"
          className="animate-caret pointer-events-none absolute top-6 left-4 z-10"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M3 1l11 7-5 1.5L7 16z"
              fill="#faf9f5"
              stroke="#141413"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
          <span className="absolute top-4 left-4 rounded-md bg-accent px-1.5 py-0.5 font-mono text-[9px] whitespace-nowrap text-ink">
            拖拽缩放
          </span>
        </div>
      </div>
    </div>
  )
})
