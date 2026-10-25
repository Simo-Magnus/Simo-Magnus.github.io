import {
  Accessibility,
  AudioLines,
  BookOpen,
  Bot,
  Brain,
  CalendarDays,
  Coins,
  ChartColumn,
  ChefHat,
  Cloud,
  Code,
  Database,
  Download,
  FlaskConical,
  Dumbbell,
  FileText,
  Globe,
  GraduationCap,
  Headphones,
  Heart,
  HeartPulse,
  Languages,
  Layers,
  Lightbulb,
  Lock,
  Mail,
  Map,
  MapPin,
  Mic,
  Monitor,
  Palette,
  PenTool,
  Rss,
  ScanBarcode,
  Search,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  Utensils,
  Watch,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import type React from 'react'
import { brandIcons, type BrandIconName } from '../data/brandIcons'
import type { IconRef, UiIconName } from '../types/content'

const uiIcons: Record<UiIconName, LucideIcon> = {
  mail: Mail,
  globe: Globe,
  download: Download,
  code: Code,
  smartphone: Smartphone,
  monitor: Monitor,
  sparkles: Sparkles,
  dumbbell: Dumbbell,
  database: Database,
  cloud: Cloud,
  wrench: Wrench,
  layers: Layers,
  heart: Heart,
  mic: Mic,
  book: BookOpen,
  graduation: GraduationCap,
  calendar: CalendarDays,
  shield: ShieldCheck,
  accessibility: Accessibility,
  zap: Zap,
  lightbulb: Lightbulb,
  'map-pin': MapPin,
  rss: Rss,
  utensils: Utensils,
  trending: TrendingUp,
  'chef-hat': ChefHat,
  'heart-pulse': HeartPulse,
  watch: Watch,
  headphones: Headphones,
  'file-text': FileText,
  audio: AudioLines,
  languages: Languages,
  palette: Palette,
  search: Search,
  chart: ChartColumn,
  brain: Brain,
  bot: Bot,
  'pen-tool': PenTool,
  flask: FlaskConical,
  coins: Coins,
  map: Map,
  scan: ScanBarcode,
  server: Server,
  lock: Lock,
}

/** Luminanza relativa approssimata: i marchi quasi neri diventano chiari sul tema scuro. */
function isVeryDark(hex: string) {
  const n = Number.parseInt(hex.slice(1), 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 70
}

interface BrandIconProps {
  name: BrandIconName
  /** true = colore ufficiale del marchio; false = colore del testo corrente. */
  colored?: boolean
  className?: string
}

export function BrandIcon({ name, colored = false, className = 'size-5' }: BrandIconProps) {
  const icon = brandIcons[name]
  const adaptive = colored && isVeryDark(icon.hex)
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={`${className} ${colored ? 'text-(--brand)' : ''} ${adaptive ? 'dark:text-fg [.inverse_&]:text-fg' : ''}`}
      style={colored ? ({ '--brand': icon.hex } as React.CSSProperties) : undefined}
      fill="currentColor"
    >
      <path d={icon.path} />
    </svg>
  )
}

interface IconProps {
  icon: IconRef
  colored?: boolean
  className?: string
}

export function Icon({ icon, colored, className = 'size-5' }: IconProps) {
  if ('brand' in icon) return <BrandIcon name={icon.brand} colored={colored} className={className} />
  const Component = uiIcons[icon.ui]
  return <Component className={className} aria-hidden="true" strokeWidth={1.75} />
}

export function UiIcon({ name, className }: { name: UiIconName; className?: string }) {
  return <Icon icon={{ ui: name }} className={className} />
}
