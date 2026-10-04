import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { Section, SectionHeading } from './Section'

interface Feature {
  title: string
  body: ReactNode
  span: string
  large?: boolean
  accent: string
  visual?: ReactNode
}

const FEATURES: Feature[] = [
  {
    title: '零外部依赖',
    span: 'lg:col-span-3 lg:row-span-2',
    large: true,
    accent: 'text-accent',
    body: (
      <>
        自 v1 起移除 lodash 与 jQuery API，v3 完成 HTML5 重写，v6 改用原生鼠标与
        <code className="rounded bg-ink/5 px-1 py-0.5 text-[13px]">
          touch
        </code>{' '}
        事件。现在你只需要一个
        <code className="rounded bg-ink/5 px-1 py-0.5 text-[13px]">gridstack-all.js</code>
        和一份 CSS 即可运行——包体积更小，升级更省心。
      </>
    ),
    visual: <DependencyVisual />,
  },
  {
    title: '纯 TypeScript 重写',
    span: 'lg:col-span-3',
    accent: 'text-blue',
    body: (
      <>
        v2 起整个库以 TypeScript 编写并使用类结构，所有 set 方法返回
        <code className="rounded bg-ink/5 px-1 py-0.5 text-[13px]">GridStack</code>
        以支持链式调用。
      </>
    ),
  },
  {
    title: '拖拽与缩放',
    span: 'lg:col-span-3',
    accent: 'text-accent',
    body: (
      <>
        桌面鼠标 + 移动端触摸双通道手势。可覆盖
        <code className="rounded bg-ink/5 px-1 py-0.5 text-[13px]">
          resizable / draggable
        </code>
        选项，自由定义缩放手柄。
      </>
    ),
  },
  {
    title: '响应式列',
    span: 'lg:col-span-2',
    accent: 'text-green',
    body: (
      <>
        通过
        <code className="rounded bg-ink/5 px-1 py-0.5 text-[13px]">columnOpts</code>
        配置任意断点的「宽度 : 列数」配对或自动列数，默认 12 列开箱即用。
      </>
    ),
  },
  {
    title: '嵌套子网格',
    span: 'lg:col-span-2',
    accent: 'text-blue',
    body: (
      <>
        v5+ 支持把父网格中的条目拖入 / 拖出嵌套子网格，并提供了相应的 API 参数。
      </>
    ),
  },
  {
    title: '原生打印支持',
    span: 'lg:col-span-2',
    accent: 'text-accent',
    body: (
      <>
        v13.1+ 部件按内容自适应、自然跨页流动。用
        <code className="rounded bg-ink/5 px-1 py-0.5 text-[13px]">PrintOptions</code>
        控制分页、横向 / 纵向与跨页拆分。
      </>
    ),
  },
  {
    title: '内置框架封装',
    span: 'lg:col-span-3',
    accent: 'text-green',
    body: (
      <>
        Angular、React、Vue 3 封装开箱即用；布局 JSON 可在三个框架间移植。另有
        Knockout、Ember、Rails、Aurelia 等社区绑定。
      </>
    ),
  },
  {
    title: '可扩展引擎',
    span: 'lg:col-span-3',
    accent: 'text-blue',
    body: (
      <>
        5.1+ 可通过
        <code className="rounded bg-ink/5 px-1 py-0.5 text-[13px]">
          GridStack.registerEngine()
        </code>
        注册自己的布局引擎，深度定制移动策略。
      </>
    ),
  },
]

export function Features() {
  return (
    <Section id="features">
      <SectionHeading
        eyebrow="Features"
        title="为仪表盘而生的每一个细节"
        lead="从一个 div 开始，到复杂的嵌套网格与打印布局。下面这些能力都内置于核心库，不需要额外插件。"
      />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-6">
        {FEATURES.map((f, i) => (
          <Reveal
            key={f.title}
            delay={(i % 3) * 0.06}
            className={f.span}
          >
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-subtle bg-paper-dim p-6 transition-colors duration-300 hover:border-mid/60">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
              <h3
                className={`text-lg font-semibold tracking-tight text-ink ${
                  f.large ? 'text-2xl' : ''
                }`}
              >
                <span className={`mr-2 font-mono text-sm ${f.accent}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {f.title}
              </h3>
              <p
                className={`mt-3 leading-relaxed text-mid-dark ${
                  f.large ? 'text-[15px]' : 'text-sm'
                }`}
              >
                {f.body}
              </p>
              {f.visual && <div className="mt-6">{f.visual}</div>}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/** Small "dependencies → none" illustration for the hero feature card. */
function DependencyVisual() {
  return (
    <div className="mt-auto rounded-xl border border-subtle bg-paper p-4">
      <p className="mb-3 font-mono text-[10px] tracking-widest text-mid-dark">
        BEFORE → AFTER
      </p>
      <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
        <span className="rounded-md border border-subtle bg-paper-dim px-2 py-1 text-mid-dark line-through">
          lodash
        </span>
        <span className="rounded-md border border-subtle bg-paper-dim px-2 py-1 text-mid-dark line-through">
          jquery
        </span>
        <span className="rounded-md border border-subtle bg-paper-dim px-2 py-1 text-mid-dark line-through">
          jquery-ui
        </span>
        <span className="text-mid">→</span>
        <span className="rounded-md bg-ink px-2 py-1 font-medium text-green">
          0 deps
        </span>
      </div>
    </div>
  )
}
