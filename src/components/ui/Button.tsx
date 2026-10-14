import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type V = 'solid' | 'ghost' | 'light' | 'outline-light'
const cls: Record<V, string> = {
  solid: 'bg-coffee text-linen-light hover:bg-coffee-dark',
  ghost: 'border border-coffee/25 text-coffee hover:border-coffee hover:bg-coffee/5',
  light: 'bg-linen-light text-coffee-dark hover:bg-white',
  'outline-light': 'border border-linen/40 text-linen-light hover:bg-linen/10',
}
type P = { children: ReactNode; to?: string; href?: string; v?: V; arrow?: boolean; icon?: ReactNode; className?: string; onClick?: () => void; type?: 'button' | 'submit' }

export function Btn({ children, to, href, v = 'solid', arrow, icon, className = '', onClick, type = 'button' }: P) {
  const c = `group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium transition-colors duration-300 ${cls[v]} ${className}`
  const inner = (
    <>
      {icon}
      <span>{children}</span>
      {arrow && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />}
    </>
  )
  if (to) return <Link to={to} className={c} onClick={onClick}>{inner}</Link>
  if (href) return <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={c} onClick={onClick}>{inner}</a>
  return <button type={type} className={c} onClick={onClick}>{inner}</button>
}
