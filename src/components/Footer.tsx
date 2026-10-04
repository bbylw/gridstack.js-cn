const COLUMNS = [
  {
    title: '文档',
    links: [
      { label: '特性', href: '#features' },
      { label: '安装与引入', href: '#install' },
      { label: '基本用法', href: '#usage' },
      { label: '进阶用法', href: '#advanced' },
    ],
  },
  {
    title: '资源',
    links: [
      { label: '完整 API 文档', href: 'https://gridstackjs.com/doc/html/' },
      { label: '在线演示', href: 'https://gridstackjs.com/demo/' },
      {
        label: '打印指南',
        href: 'https://github.com/gridstack/gridstack.js/tree/master/print_README.md',
      },
      {
        label: '更新日志',
        href: 'https://github.com/gridstack/gridstack.js/tree/master/doc/CHANGES.md',
      },
    ],
  },
  {
    title: '项目',
    links: [
      { label: 'GitHub', href: 'https://github.com/gridstack/gridstack.js' },
      { label: 'NPM 包', href: 'https://www.npmjs.com/package/gridstack' },
      {
        label: '贡献者',
        href: 'https://github.com/gridstack/gridstack.js/graphs/contributors',
      },
    ],
  },
]

export function Footer() {
  return (
    <footer className="grain relative border-t border-white/10 bg-ink px-5 py-16 text-paper sm:px-8">
      <div
        aria-hidden="true"
        className="bg-blueprint-dark pointer-events-none absolute inset-0 opacity-50"
      />
      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="grid size-7 grid-cols-2 grid-rows-2 gap-0.5 rounded-md bg-accent p-1"
              >
                <span className="rounded-[1px] bg-ink/85" />
                <span className="rounded-[1px] bg-ink/85" />
                <span className="rounded-[1px] bg-ink/85" />
                <span className="rounded-[1px] bg-ink/40" />
              </span>
              <span className="font-mono text-[15px] font-semibold">
                gridstack<span className="text-accent">.js</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mid">
              移动端友好的现代纯 TypeScript 库，用于构建拖拽式、多列、响应式仪表盘。
            </p>
            <p className="mt-4 font-mono text-[11px] tracking-wide text-mid/70">
              本页为社区中文文档整理，内容基于官方 README。
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-mono text-[11px] tracking-[0.24em] text-accent">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('#') ? undefined : '_blank'}
                      rel={
                        link.href.startsWith('#') ? undefined : 'noreferrer'
                      }
                      className="text-sm text-mid transition-colors duration-200 hover:text-paper"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-mid sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono">
            gridstack.js · 灵感来自已停止维护的 gridster，倾注热爱打造。
          </p>
          <p className="font-mono">
            Vite · React · TypeScript · Tailwind CSS — 使用 bun 构建
          </p>
        </div>
      </div>
    </footer>
  )
}
