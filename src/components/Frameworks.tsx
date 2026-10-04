import { Reveal } from './Reveal'
import { Section, SectionHeading } from './Section'

const BUILTIN = [
  {
    name: 'Angular',
    href: 'https://github.com/gridstack/gridstack.js/tree/master/angular',
    note: '组件式封装，部件 JSON 使用 component / props 字段。',
    sig: 'GridstackComponent.registerComponents([…])',
  },
  {
    name: 'React',
    href: 'https://github.com/gridstack/gridstack.js/tree/master/react',
    note: '与 React 18/19 配合的 Hooks 与组件封装。',
    sig: '<GridStack>{children}</GridStack>',
  },
  {
    name: 'Vue 3',
    href: 'https://github.com/gridstack/gridstack.js/tree/master/vue',
    note: '面向 Vue 3 的组合式封装。',
    sig: '<GridStack v-model:grid="…" />',
  },
]

const COMMUNITY = [
  { name: 'AngularJS', href: 'https://github.com/kdietrich/gridstack-angular' },
  { name: 'Angular9', href: 'https://github.com/pfms84/lb-gridstack' },
  {
    name: 'Ember',
    href: 'https://github.com/yahoo/ember-gridstack',
  },
  { name: 'Knockout', href: 'https://gridstackjs.com/demo/knockout.html' },
  {
    name: 'Rails',
    href: 'https://github.com/randoum/gridstack-js-rails',
  },
  {
    name: 'Aurelia',
    href: 'https://aurelia-ui-toolkits.github.io/aurelia-gridstack/',
  },
]

export function Frameworks() {
  return (
    <Section id="frameworks" className="bg-paper-dim">
      <div
        aria-hidden="true"
        className="bg-blueprint pointer-events-none absolute inset-0 opacity-60"
      />
      <div className="relative">
        <SectionHeading
          eyebrow="Frameworks"
          title="与你的技术栈无缝配合"
          lead="Angular、React、Vue 3 由官方直接提供封装；社区也为更多框架贡献了绑定，列表仍在持续增长。"
        />

        <div className="grid gap-3 md:grid-cols-3">
          {BUILTIN.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.07}>
              <a
                href={f.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-subtle bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-diffuse"
              >
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-sm bg-accent" />
                  <h3 className="text-xl font-semibold tracking-tight text-ink">
                    {f.name}
                  </h3>
                  <span className="ml-auto rounded-full border border-green/40 bg-green/10 px-2 py-0.5 font-mono text-[10px] text-green">
                    内置
                  </span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mid-dark">
                  {f.note}
                </p>
                <code className="mt-5 block truncate rounded-lg border border-subtle bg-paper-dim px-3 py-2 font-mono text-[11px] text-mid-dark">
                  {f.sig}
                </code>
                <span className="mt-4 font-mono text-[11px] text-accent transition-transform duration-300 group-hover:translate-x-1">
                  查看组件文档 →
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10">
          <p className="mb-4 font-mono text-[11px] tracking-widest text-mid-dark">
            社区绑定
          </p>
          <ul className="flex flex-wrap gap-2">
            {COMMUNITY.map((c) => (
              <li key={c.name}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-full border border-subtle bg-paper px-4 py-2 font-mono text-xs text-ink transition-colors duration-200 hover:border-accent hover:text-accent-deep"
                >
                  {c.name} ↗
                </a>
              </li>
            ))}
            <li>
              <a
                href="https://www.npmjs.com/search?q=gridstack&ranking=popularity"
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-full bg-ink px-4 py-2 font-mono text-xs text-paper transition-colors duration-200 hover:bg-ink-soft"
              >
                在 NPM 搜索 'gridstack' ↗
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
