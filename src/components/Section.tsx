import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
  dark?: boolean
}

export function Section({ id, children, className = '', dark }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 px-5 py-20 sm:px-8 md:py-28 ${
        dark ? 'bg-ink text-paper' : ''
      } ${className}`}
    >
      <div className="mx-auto w-full max-w-[1200px]">{children}</div>
    </section>
  )
}

interface HeadingProps {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  dark?: boolean
}

export function SectionHeading({ eyebrow, title, lead, dark }: HeadingProps) {
  return (
    <Reveal className="mb-12 max-w-3xl md:mb-16">
      <div className="mb-4 flex items-center gap-3">
        <span
          className={`h-px w-8 ${dark ? 'bg-accent' : 'bg-accent-deep'}`}
          aria-hidden="true"
        />
        <span
          className={`font-mono text-[11px] uppercase tracking-[0.28em] ${
            dark ? 'text-accent' : 'text-accent-deep'
          }`}
        >
          {eyebrow}
        </span>
      </div>
      <h2
        className={`text-3xl leading-[1.1] font-semibold sm:text-4xl md:text-[2.75rem] ${
          dark ? 'text-paper' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-5 max-w-[62ch] text-[15px] leading-relaxed md:text-base ${
            dark ? 'text-mid' : 'text-mid-dark'
          }`}
        >
          {lead}
        </p>
      )}
    </Reveal>
  )
}
