import { useEffect, useState } from 'react'
import { hours } from '../data/site'

/** Current day/time in Madinah (Asia/Riyadh), wherever the visitor is. */
export function madinahNow(d = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Riyadh', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(d)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '0'
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

export type Status = { open: boolean; today: number; minsLeft: number; nextDay: number; nextHour: number; progress: number }

export function officeStatus(d = new Date()): Status {
  const { day, minutes } = madinahNow(d)
  const t = hours[day].open
  if (t && minutes >= t[0] * 60 && minutes < t[1] * 60) {
    return { open: true, today: day, minsLeft: t[1] * 60 - minutes, nextDay: day, nextHour: t[1], progress: (minutes - t[0] * 60) / ((t[1] - t[0]) * 60) }
  }
  // find the next opening
  for (let i = 0; i < 8; i++) {
    const dd = (day + i) % 7
    const o = hours[dd].open
    if (!o) continue
    if (i === 0 && minutes >= o[0] * 60) continue
    return { open: false, today: day, minsLeft: 0, nextDay: dd, nextHour: o[0], progress: 0 }
  }
  return { open: false, today: day, minsLeft: 0, nextDay: 0, nextHour: 15, progress: 0 }
}

export function useOfficeStatus() {
  const [s, setS] = useState(() => officeStatus())
  useEffect(() => {
    const id = setInterval(() => setS(officeStatus()), 30_000)
    return () => clearInterval(id)
  }, [])
  return s
}
