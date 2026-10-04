import { CodeBlock } from './CodeBlock'
import { Reveal } from './Reveal'
import { Section, SectionHeading } from './Section'
import { Tabs, type TabItem } from './Tabs'
import { snippets } from '../data/snippets'

const COLUMN_TABS: TabItem[] = [
  {
    id: 'init',
    label: '初始化',
    content: <CodeBlock {...snippets.columnsInit} />,
  },
  {
    id: 'css',
    label: '自定义 CSS（已废弃）',
    content: <CodeBlock {...snippets.columnsCss} />,
  },
  {
    id: 'scss',
    label: '生成 SCSS',
    content: <CodeBlock {...snippets.columnsScss} />,
  },
  {
    id: 'gulp',
    label: 'gulp 批处理',
    content: <CodeBlock {...snippets.columnsGulp} />,
  },
]

export function Advanced() {
  return (
    <Section id="advanced">
      <SectionHeading
        eyebrow="Advanced"
        title="当默认行为不够用时"
        lead="扩展原型、替换布局引擎、调整列数、覆盖手势选项——核心库都为这些场景留好了接口。"
      />

      <div className="grid gap-3 lg:grid-cols-2">
        {/* 扩展库 */}
        <Reveal>
          <article className="flex h-full flex-col rounded-2xl border border-subtle bg-white/70 p-6">
            <span className="font-mono text-[11px] tracking-widest text-accent">
              扩展库
            </span>
            <h3 className="mt-2 text-xl font-semibold text-ink">
              给它加上自己的方法
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-mid-dark">
              GridStack 的实例方法挂在原型上，你可以用一行代码扩展或修补它。
            </p>
            <div className="mt-5">
              <CodeBlock {...snippets.extendLibrary} />
            </div>
          </article>
        </Reveal>

        {/* 覆盖选项 + 触摸 */}
        <div className="grid gap-3">
          <Reveal delay={0.06}>
            <article className="flex h-full flex-col rounded-2xl border border-subtle bg-white/70 p-6">
              <span className="font-mono text-[11px] tracking-widest text-blue">
                覆盖选项
              </span>
              <h3 className="mt-2 text-xl font-semibold text-ink">
                自定义缩放手柄
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mid-dark">
                默认的 resizable / draggable 选项都可以被覆盖。例如启用除右下角以外的缩放手柄：
              </p>
              <div className="mt-5">
                <CodeBlock {...snippets.overrideOptions} />
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.12}>
            <article className="flex h-full flex-col rounded-2xl border border-subtle bg-white/70 p-6">
              <span className="font-mono text-[11px] tracking-widest text-green">
                触摸设备
              </span>
              <h3 className="mt-2 text-xl font-semibold text-ink">
                移动端开箱即用
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mid-dark">
                v6+ 通过原生触摸事件（连同鼠标事件）实现拖拽与缩放，无需
                touch punch。
              </p>
              <div className="mt-5">
                <CodeBlock {...snippets.touch} />
              </div>
            </article>
          </Reveal>
        </div>
      </div>

      {/* 扩展引擎 — full width, dark inset */}
      <Reveal className="mt-3">
        <article className="relative overflow-hidden rounded-2xl bg-ink p-6 text-paper sm:p-8">
          <div
            aria-hidden="true"
            className="bg-blueprint-dark pointer-events-none absolute inset-0 opacity-60"
          />
          <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <span className="font-mono text-[11px] tracking-widest text-accent">
                扩展引擎 · 5.1+
              </span>
              <h3 className="mt-2 text-2xl font-semibold text-balance">
                替换整个布局引擎
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mid">
                继承
                <code className="mx-1 text-paper">GridStackEngine</code>
                并重写移动策略，再用
                <code className="mx-1 text-paper">GridStack.registerEngine()</code>
                全局注册，即可彻底改变布局行为。
              </p>
            </div>
            <CodeBlock {...snippets.extendEngine} />
          </div>
        </article>
      </Reveal>

      {/* 修改网格列数 — full width */}
      <Reveal className="mt-3">
        <article className="rounded-2xl border border-subtle bg-white/70 p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <span className="font-mono text-[11px] tracking-widest text-accent">
                修改网格列数
              </span>
              <h3 className="mt-2 text-2xl font-semibold text-ink">
                需要 [1–12] 之外的列数？
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mid-dark">
                默认 12 列开箱即用。自定义列数时，只需在创建网格时把
                <code className="mx-1 rounded bg-ink/5 px-1 py-0.5 text-[13px]">
                  column
                </code>
                设为你的数字 N。
              </p>
              <div className="mt-5 rounded-xl border border-green/30 bg-green/8 p-4">
                <p className="font-mono text-[11px] tracking-wide text-green">
                  v12+ 提示
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-mid-dark">
                  列数与单元格高度已改用浏览器 CSS
                  变量实现，不再需要引入
                  <code className="mx-1 text-ink">gridstack-extra.min.css</code>
                  或手写列 CSS class——这一步骤已废弃。
                </p>
              </div>
            </div>
            <Tabs items={COLUMN_TABS} ariaLabel="列数配置" />
          </div>
        </article>
      </Reveal>

      {/* 打印支持 */}
      <Reveal className="mt-3">
        <article className="grid gap-6 rounded-2xl border border-subtle bg-white/70 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="font-mono text-[11px] tracking-widest text-blue">
              打印支持 · v13.1+
            </span>
            <h3 className="mt-2 text-2xl font-semibold text-ink">
              让仪表盘体面地打印
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mid-dark">
              部件会按内容自动调整尺寸，并自然地跨页流动，不会被从中间截断；被隐藏的部件
              （<code className="text-ink">print.hide</code>）也不会留下空隙。
              每个部件的
              <code className="text-ink"> PrintOptions</code>
              允许你强制分页、将所在页切换为横向 / 纵向，或让高于一页的部件（如长表格）跨页拆分。
            </p>
            <a
              href="https://github.com/gridstack/gridstack.js/tree/master/print_README.md"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-subtle px-4 py-2.5 text-sm text-ink transition-colors hover:border-accent hover:text-accent-deep"
            >
              阅读打印指南 ↗
            </a>
          </div>
          <div className="rounded-xl border border-subtle bg-paper-dim p-5">
            <p className="font-mono text-[10px] tracking-widest text-mid-dark">
              PrintOptions
            </p>
            <ul className="mt-3 space-y-2.5 font-mono text-xs text-ink">
              {['pageBreak', 'orientation', 'breakInside'].map((k) => (
                <li
                  key={k}
                  className="flex items-center justify-between rounded-md border border-subtle bg-white px-3 py-2"
                >
                  <span>{k}</span>
                  <span className="text-green">✓</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </Reveal>
    </Section>
  )
}
