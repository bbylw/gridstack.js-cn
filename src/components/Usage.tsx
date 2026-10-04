import { CodeBlock } from './CodeBlock'
import { Reveal } from './Reveal'
import { Section, SectionHeading } from './Section'
import { Tabs, type TabItem } from './Tabs'
import { snippets } from '../data/snippets'

const USAGE_TABS: TabItem[] = [
  {
    id: 'dynamic',
    label: '动态创建',
    content: <CodeBlock {...snippets.usageDynamic} />,
  },
  {
    id: 'list',
    label: '从列表创建',
    content: <CodeBlock {...snippets.usageList} />,
  },
  {
    id: 'dom',
    label: 'DOM 创建',
    content: <CodeBlock {...snippets.usageDom} />,
  },
]

const POINTS = [
  {
    n: '01',
    title: '初始化网格',
    body: 'GridStack.init() 默认匹配 .grid-stack 元素，返回可链式调用的 GridStack 实例。',
  },
  {
    n: '02',
    title: '添加部件',
    body: 'grid.addWidget({ w: 2, content: "…" }) 直接追加；或调用 grid.load(data) 载入序列化布局。',
  },
  {
    n: '03',
    title: '保存与恢复',
    body: 'grid.save() 输出纯 JSON，可持久化到后端，随后原样恢复整块仪表盘。',
  },
]

export function Usage() {
  return (
    <Section id="usage">
      <SectionHeading
        eyebrow="Basic Usage"
        title="三行代码，网格就动起来了"
        lead="你可以动态创建部件、载入序列化数据，或直接写 DOM。三种方式可以自由混合。"
      />

      <div className="grid min-w-0 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="min-w-0">
          <ol className="divide-y divide-subtle border-y border-subtle">
            {POINTS.map((p) => (
              <li key={p.n} className="flex gap-5 py-6">
                <span className="font-mono text-xs text-accent">{p.n}</span>
                <div>
                  <h3 className="text-base font-semibold text-ink">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mid-dark">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm leading-relaxed text-mid-dark">
            更多请见
            <a
              href="https://github.com/gridstack/gridstack.js/tree/master/doc"
              target="_blank"
              rel="noreferrer"
              className="mx-1 text-accent-deep underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
            >
              API 与选项
            </a>
            文档。
          </p>
        </Reveal>

        <Reveal delay={0.08} className="min-w-0">
          <Tabs items={USAGE_TABS} ariaLabel="创建方式" />
        </Reveal>
      </div>
    </Section>
  )
}
