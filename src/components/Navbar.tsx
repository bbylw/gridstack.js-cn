import { useEffect, useRef, useState } from 'react'

const LINKS = [
  { href: '#features', label: '特性' },
  { href: '#install', label: '安装' },
  { href: '#usage', label: '用法' },
  { href: '#playground', label: '演示' },
  { href: '#frameworks', label: '框架' },
  { href: '#advanced', label: '进阶' },
]

const GITHUB = 'https://github.com/gridstack/gridstack.js'

export function Navbar() {
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current !== null) return
      rafRef.current = window.requestAnimationFrame(() => {
        const doc = document.documentElement
        const max = doc.scrollHeight - doc.clientHeight
        setProgress(max > 0 ? Math.min(1, doc.scrollTop / max) : 0)
        rafRef.current = null
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => el !== null,
    )
    if (sections.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-white/10 bg-ink/85 text-paper backdrop-blur-xl">
        <nav
          aria-label="主导航"
          className="mx-auto flex h-16 w-full max-w-300 items-center gap-3 px-5 sm:px-8"
        >
          <a
            href="#top"
            className="group flex items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <GridMark />
            <span className="font-mono text-[15px] font-semibold tracking-tight">
              gridstack<span className="text-accent">.js</span>
            </span>
          </a>

          <ul className="ml-auto hidden items-center gap-1 lg:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                    active === link.href
                      ? 'text-paper'
                      : 'text-mid hover:text-paper'
                  }`}
                >
                  {link.label}
                  {active === link.href && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-accent"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            className="ml-auto hidden items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm text-paper transition-colors duration-200 hover:border-accent hover:text-accent lg:ml-2 lg:flex"
          >
            <GitHubIcon />
            <span className="font-mono text-xs">GitHub</span>
          </a>

          <button
            type="button"
            aria-expanded={open}
            aria-label="切换菜单"
            onClick={() => setOpen((v) => !v)}
            className="ml-auto grid size-9 place-items-center rounded-lg border border-white/15 text-paper lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-300 ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-px w-4 bg-current transition-opacity duration-200 ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-300 ${
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </nav>

        {/* scroll progress */}
        <div
          aria-hidden="true"
          className="h-px origin-left bg-accent transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* mobile drawer */}
      <div
        // `inert` keeps the collapsed drawer out of the tab order / a11y tree;
        // without it the invisible links stay keyboard-focusable.
        inert={!open}
        aria-hidden={!open}
        className={`overflow-hidden border-b border-white/10 bg-ink text-paper transition-[max-height,opacity] duration-400 ease-out-expo lg:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="mx-auto grid w-full max-w-300 gap-1 px-5 py-4 sm:px-8">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm text-mid transition-colors hover:bg-white/5 hover:text-paper"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-1">
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2.5 text-sm"
            >
              <GitHubIcon /> GitHub 仓库
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}

function GridMark() {
  return (
    <span
      aria-hidden="true"
      className="grid size-7 grid-cols-2 grid-rows-2 gap-0.5 rounded-md bg-accent p-1 transition-transform duration-300 group-hover:rotate-6"
    >
      <span className="rounded-[1px] bg-ink/85" />
      <span className="rounded-[1px] bg-ink/85" />
      <span className="rounded-[1px] bg-ink/85" />
      <span className="rounded-[1px] bg-ink/40" />
    </span>
  )
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}
