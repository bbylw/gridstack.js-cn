import { CodeBlock } from './CodeBlock'
import { Reveal } from './Reveal'
import { Section, SectionHeading } from './Section'
import { Tabs, type TabItem } from './Tabs'
import { snippets } from '../data/snippets'

const JDROP_TABS: TabItem[] = [
  {
    id: 'esm',
    label: 'ES6 引入',
    content: <CodeBlock {...snippets.jqueryImport} />,
  },
  {
    id: 'alias',
    label: 'webpack alias',
    content: <CodeBlock {...snippets.jqueryAlias} />,
  },
  {
    id: 'html',
    label: 'HTML script',
    content: (
      <CodeBlock
        lang="html"
        code={`<link href="node_modules/gridstack/dist/gridstack.min.css" rel="stylesheet"/>
<!-- HTML5 拖拽 (70k) -->
<script src="node_modules/gridstack/dist/gridstack-h5.js"></script>
<!-- 或 jquery-ui 拖拽 (195k) -->
<script src="node_modules/gridstack/dist/gridstack-jq.js"></script>
<!-- 或静态网格 (40k) -->
<script src="node_modules/gridstack/dist/gridstack-static.js"></script>`}
      />
    ),
  },
]

export function JQuery() {
  return (
    <Section id="jquery" dark>
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative">
        <SectionHeading
          dark
          eyebrow="Legacy · jQuery"
          title="jQuery 应用（已过时）"
          lead="自 v6 起核心不再依赖 jQuery。若你仍需 jQuery 版本，请使用 v5.1.1 及更早版本——下面的用法仅作历史参考。"
        />

        <Reveal>
          <div
            role="note"
            className="mb-8 flex items-start gap-3 rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm text-paper"
          >
            <span aria-hidden="true" className="mt-0.5 text-accent">
              ▲
            </span>
            <p>
              这部分 <strong className="text-accent">已过时，不再适用于 v6+</strong>。
              请改用原生版本；v6 的原生拖拽在体积上与旧 h5 版本持平，并原生支持移动端。
            </p>
          </div>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <Tabs items={JDROP_TABS} ariaLabel="jQuery 引入方式" />
          </Reveal>

          <Reveal delay={0.08} className="space-y-4 text-sm leading-relaxed text-mid">
            <p>
              jQuery 与 jquery-ui 按名称导入，因此需要在 webpack（或等效配置）中指定它们的位置——这意味着你也可以自带自己的版本。
            </p>
            <p>
              <code className="text-paper">gridstack-jq.js</code> 打包了 jquery 3.5.1 +
              jquery-ui 1.13.1（最小化的 drag|drop|resize）+ jquery-ui-touch-punch 1.0.8。
            </p>
            <ul className="space-y-3 border-t border-white/10 pt-4">
              <li className="flex gap-3">
                <span className="font-mono text-xs text-blue">v4 · v3</span>
                <span>通过 ES6 模块按名称导入 jquery 与 jquery-ui，需指定文件位置，也可自带版本。</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-xs text-blue">v1.x</span>
                <span>
                  若自带 JQ 版本，应在导入 JQ 之后引入
                  <code className="mx-1 text-paper">gridstack-poly.min.js</code> +
                  <code className="mx-1 text-paper">gridstack.min.js</code> +
                  <code className="mx-1 text-paper">gridstack.jQueryUI.min.js</code>。
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-xs text-blue">事件</span>
                <span>
                  使用 jquery-ui 的版本仍可用 <code className="text-paper">$(".grid-stack").on(...)</code> 处理核心不支持的事件。
                </span>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
