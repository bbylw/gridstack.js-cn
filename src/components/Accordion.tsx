import { useId, useState, type ReactNode } from 'react'

export interface AccordionItem {
  id: string
  tag: string
  title: string
  summary: string
  breaking?: boolean
  content: ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  defaultOpenId?: string
}

export function Accordion({ items, defaultOpenId }: AccordionProps) {
  const [open, setOpen] = useState<string | null>(defaultOpenId ?? null)
  const baseId = useId()

  return (
    <div className="divide-y divide-subtle border-y border-subtle">
      {items.map((item) => {
        const isOpen = open === item.id
        return (
          <div key={item.id} className="group">
            <h3>
              <button
                type="button"
                id={`${baseId}-trigger-${item.id}`}
                aria-expanded={isOpen}
                aria-controls={`${baseId}-panel-${item.id}`}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="flex w-full items-baseline gap-4 py-5 text-left transition-colors hover:bg-paper-dim/60 sm:gap-6 sm:px-2"
              >
                <span className="w-16 shrink-0 font-mono text-xs text-mid-dark sm:w-20">
                  {item.tag}
                </span>
                <span className="flex-1">
                  <span className="flex flex-wrap items-center gap-2.5">
                    <span className="text-lg font-semibold tracking-tight text-ink">
                      {item.title}
                    </span>
                    {item.breaking && (
                      <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] tracking-wide text-accent-deep">
                        破坏性
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-mid-dark">
                    {item.summary}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`mt-1 grid size-7 shrink-0 place-items-center rounded-full border border-subtle text-mid-dark transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'rotate-45 border-accent text-accent' : ''
                  }`}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M6 1v10M1 6h10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={`${baseId}-panel-${item.id}`}
              role="region"
              aria-labelledby={`${baseId}-trigger-${item.id}`}
              // the panel stays mounted while collapsed (for the height
              // transition), so `inert` keeps its buttons/links untabbable
              inert={!isOpen}
              className="grid overflow-hidden transition-[grid-template-rows] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="min-h-0">
                <div
                  className={`pb-7 pl-0 transition-opacity duration-300 sm:pl-[6.5rem] ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="max-w-[68ch] space-y-4 text-[15px] leading-relaxed text-ink/85">
                    {item.content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
