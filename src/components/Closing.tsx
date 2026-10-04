import { Reveal } from './Reveal'
import { Section, SectionHeading } from './Section'

const TEAM = [
  {
    role: '现任维护者',
    name: 'Alain Dumesny',
    href: 'https://github.com/adumesny',
    note: '持续维护 gridstack.js，推动 v3–v14 的现代化重写。',
  },
  {
    role: '前任维护者',
    name: 'Dylan Weiss',
    href: 'https://github.com/radiolips',
    note: '在早期版本中接手并稳定了项目。',
  },
  {
    role: '项目创建者',
    name: 'Pavel Reznikov',
    href: 'https://github.com/troolee',
    note: '最初创建了 gridstack.js，灵感来自已停止维护的 gridster。',
  },
]

const LINKS = [
  {
    label: '使用趋势',
    title: '看看社区的使用规模',
    href: 'https://npm-compare.com/gridstack#timeRange=THREE_YEARS',
    cta: '在 npm-compare 查看 ↗',
    note: '近三年的 NPM 下载趋势。',
  },
  {
    label: '更新日志',
    title: '每个版本的改动',
    href: 'https://github.com/gridstack/gridstack.js/tree/master/doc/CHANGES.md',
    cta: '阅读 CHANGES.md ↗',
    note: '完整记录新增功能与修复。',
  },
]

export function Closing() {
  return (
    <Section id="team">
      <SectionHeading
        eyebrow="Project"
        title="一个仍在活跃演进的社区项目"
        lead="gridstack.js 由社区共同维护。感谢每一位贡献者的帮助，也欢迎你以任何方式参与进来。"
      />

      <div className="grid gap-3 md:grid-cols-2">
        {LINKS.map((l, i) => (
          <Reveal key={l.label} delay={i * 0.06}>
            <a
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-subtle bg-paper-dim p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-diffuse"
            >
              <span className="font-mono text-[11px] tracking-widest text-accent-deep">
                {l.label}
              </span>
              <h3 className="mt-2 text-xl font-semibold text-ink">{l.title}</h3>
              <p className="mt-2 text-sm text-mid-dark">{l.note}</p>
              <span className="mt-6 font-mono text-xs text-ink transition-transform duration-300 group-hover:translate-x-1">
                {l.cta}
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14">
        <h3 className="mb-6 font-mono text-[11px] tracking-[0.28em] text-mid-dark">
          开发团队
        </h3>
        <ol className="grid gap-3 md:grid-cols-3">
          {TEAM.map((m) => (
            <li
              key={m.name}
              className="rounded-2xl border border-subtle bg-paper-dim p-6"
            >
              <p className="font-mono text-[10px] tracking-widest text-accent-deep">
                {m.role}
              </p>
              <a
                href={m.href}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block text-lg font-semibold text-ink transition-colors hover:text-accent-deep"
              >
                {m.name}
              </a>
              <p className="mt-2 text-sm leading-relaxed text-mid-dark">
                {m.note}
              </p>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal className="mt-6">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-subtle bg-paper-dim p-6">
          <p className="mr-auto text-sm text-mid-dark">
            觉得这个库有用？支持项目继续发展——
          </p>
          <a
            href="https://www.paypal.me/alaind831"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-subtle bg-paper px-4 py-2.5 text-sm text-ink transition-colors hover:border-accent hover:text-accent-deep"
          >
            PayPal 捐赠
          </a>
          <a
            href="https://www.venmo.com/adumesny"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-subtle bg-paper px-4 py-2.5 text-sm text-ink transition-colors hover:border-accent hover:text-accent-deep"
          >
            Venmo 捐赠
          </a>
          <a
            href="https://join.slack.com/t/gridstackjs/shared_invite/zt-3978nsff6-HDNE_N45DydP36NBSV9JFQ"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-ink px-4 py-2.5 text-sm text-paper transition-colors hover:bg-ink-soft"
          >
            加入 Slack
          </a>
        </div>
      </Reveal>
    </Section>
  )
}
