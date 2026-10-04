import { CodeBlock } from './CodeBlock'
import { Reveal } from './Reveal'
import { Section, SectionHeading } from './Section'
import { Tabs, type TabItem } from './Tabs'
import { snippets } from '../data/snippets'

const PACKAGE_TABS: TabItem[] = [
  {
    id: 'bun',
    label: 'bun',
    content: <CodeBlock lang="bash" code="bun add gridstack" />,
  },
  {
    id: 'yarn',
    label: 'yarn',
    content: <CodeBlock lang="bash" code="yarn add gridstack" />,
  },
  {
    id: 'npm',
    label: 'npm',
    content: <CodeBlock lang="bash" code="npm install --save gridstack" />,
  },
]

const IMPORT_TABS: TabItem[] = [
  {
    id: 'esm',
    label: 'ES6 / TypeScript',
    content: <CodeBlock {...snippets.importEsm} />,
  },
  {
    id: 'html',
    label: 'HTML',
    content: <CodeBlock {...snippets.importHtml} />,
  },
  {
    id: 'legacy',
    label: '旧浏览器',
    content: <CodeBlock {...snippets.importLegacy} />,
  },
]

export function Install() {
  return (
    <Section id="install" dark>
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative">
        <SectionHeading
          dark
          eyebrow="Install & Include"
          title="两步接入你的项目"
          lead="用包管理器安装，然后按你使用的构建方式引入。整个库由一份 JS 与一份 CSS 组成。"
        />

        <div className="grid min-w-0 gap-10 lg:grid-cols-2">
          <Reveal className="min-w-0">
            <div className="mb-4 flex items-baseline gap-3">
              <span className="font-mono text-xs text-accent">01</span>
              <h3 className="text-xl font-semibold text-paper">安装</h3>
            </div>
            <Tabs items={PACKAGE_TABS} ariaLabel="包管理器" dark />

            <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="font-mono text-[11px] tracking-widest text-accent">
                环境要求
              </p>
              <p className="mt-2 text-sm leading-relaxed text-mid">
                自 v1 起不再需要外部依赖（lodash 在 v0.5 移除，jQuery API 在
                v1 移除）；v3 完成 HTML5 重写；v6 使用原生鼠标与触摸事件支持移动端，不再提供
                jquery-ui 版本。现在你只需要引入
                <code className="mx-1 text-paper">gridstack-all.js</code>与
                <code className="mx-1 text-paper">gridstack.min.css</code>
                ——布局基于 CSS 列宽的百分比实现。
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mb-4 flex items-baseline gap-3">
              <span className="font-mono text-xs text-accent">02</span>
              <h3 className="text-xl font-semibold text-paper">引入</h3>
            </div>
            <Tabs items={IMPORT_TABS} ariaLabel="引入方式" dark />

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://gridstackjs.com/doc/html/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm text-paper transition-colors hover:border-accent hover:text-accent"
              >
                完整 API 文档 ↗
              </a>
              <a
                href="https://stackblitz.com/edit/gridstack-demo"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm text-paper transition-colors hover:border-accent hover:text-accent"
              >
                StackBlitz 示例 ↗
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
