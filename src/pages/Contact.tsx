import { AnimatePresence, motion } from 'framer-motion'
import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import { useMemo, useState } from 'react'
import { MapCard, WeekList } from '../components/home/HoursMap'
import Mark from '../components/ui/Mark'
import OpenBadge from '../components/ui/OpenBadge'
import PageHead from '../components/ui/PageHead'
import { Heading, Reveal } from '../components/ui/Reveal'
import Seal from '../components/ui/Seal'
import { office, services, waLink } from '../data/site'
import { useLang, type Bi } from '../i18n/LangContext'

const roles: { id: string; l: Bi }[] = [
  { id: 'owner', l: { ar: 'مالك عقار', en: 'Property owner' } },
  { id: 'seeker', l: { ar: 'أبحث عن عقار', en: 'Looking for a property' } },
  { id: 'investor', l: { ar: 'مستثمر', en: 'Investor' } },
]

/** Live document line: label + dotted line that fills with what you type, with a blinking caret. */
function DocLine({ label, value, active }: { label: string; value: string; active: boolean }) {
  return (
    <div className="flex items-end gap-3 py-2">
      <span className="shrink-0 text-[13px] text-slate-light">{label}:</span>
      <span className="relative min-h-[26px] flex-1 border-b border-dotted border-coffee/35 pb-0.5 text-[15px] text-coffee-dark">
        {value}
        {active && <span className="ms-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-coffee" />}
      </span>
    </div>
  )
}

export default function Contact() {
  const { L, lang, t } = useLang()
  const [f, setF] = useState({ name: '', phone: '', service: services[0].id as string, role: 'owner', district: '', notes: '' })
  const [focus, setFocus] = useState('')
  const [err, setErr] = useState<Record<string, boolean>>({})
  const [sent, setSent] = useState(false)
  const no = useMemo(() => `MWN-${String(Math.floor(1000 + Math.random() * 9000))}`, [])
  const today = new Intl.DateTimeFormat(lang === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())
  const svc = services.find((s) => s.id === f.service)
  const role = roles.find((r) => r.id === f.role)!
  const up = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { setF({ ...f, [k]: e.target.value }); setErr({ ...err, [k]: false }); setSent(false) }
  const fp = (k: string) => ({ onFocus: () => setFocus(k), onBlur: () => setFocus('') })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const bad = { name: !f.name.trim(), phone: !/^[+\d\s-]{9,}$/.test(f.phone.trim()) }
    setErr(bad)
    if (bad.name || bad.phone) return
    const msg = lang === 'ar'
      ? `طلب خدمة عقارية (${no})\nالاسم: ${f.name}\nالجوال: ${f.phone}\nالخدمة: ${svc ? svc.title.ar : ''}\nالصفة: ${role.l.ar}\nالحي: ${f.district || '-'}\nالتفاصيل: ${f.notes || '-'}`
      : `Service request (${no})\nName: ${f.name}\nPhone: ${f.phone}\nService: ${svc ? svc.title.en : ''}\nI am: ${role.l.en}\nDistrict: ${f.district || '-'}\nDetails: ${f.notes || '-'}`
    setSent(true)
    window.open(waLink(msg), '_blank', 'noopener')
  }

  const field = (k: 'name' | 'phone' | 'district', label: Bi, ph: Bi, type = 'text') => (
    <label className="block">
      <span className="label">{L(label)}{(k === 'name' || k === 'phone') && <span className="text-coffee"> *</span>}</span>
      <input type={type} value={f[k]} onChange={up(k)} {...fp(k)} placeholder={L(ph)} dir={k === 'phone' ? 'ltr' : undefined} className={`input mt-1.5 ${k === 'phone' && lang === 'ar' ? 'text-right' : ''} ${err[k] ? '!border-red-700/70' : ''}`} aria-invalid={!!err[k]} />
      {err[k] && <span className="mt-1 block text-[12px] text-red-800">{L(k === 'name' ? { ar: 'الاسم مطلوب', en: 'Name is required' } : { ar: 'أدخل رقم جوال صحيح', en: 'Enter a valid mobile number' })}</span>}
    </label>
  )

  return (
    <>
      <PageHead no="05" title={t('nav_contact')} sub={L({ ar: 'اكتب طلبك وشاهده يتحول إلى وثيقة أمامك، ثم أرسله إلينا عبر واتساب بضغطة واحدة.', en: 'Write your request and watch it become a document in front of you, then send it to us on WhatsApp in one tap.' })}>
        <div className="mt-6"><OpenBadge /></div>
      </PageHead>

      <section className="bg-linen py-20">
        <div className="wrap grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* the form */}
          <Reveal>
            <form onSubmit={submit} noValidate className="rounded-2xl bg-linen-light p-6 ring-1 ring-coffee/10 sm:p-8">
              <p className="font-display text-xl text-coffee-dark">{L({ ar: 'نموذج طلب خدمة', en: 'Service request form' })}</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {field('name', { ar: 'الاسم', en: 'Full name' }, { ar: 'اسمك الكريم', en: 'Your name' })}
                {field('phone', { ar: 'رقم الجوال', en: 'Mobile number' }, { ar: '05xxxxxxxx', en: '05xxxxxxxx' }, 'tel')}
              </div>
              <fieldset className="mt-5">
                <legend className="label">{L({ ar: 'أنا', en: 'I am' })}</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {roles.map((r) => (
                    <button type="button" key={r.id} onClick={() => setF({ ...f, role: r.id })} className={`rounded-full border px-4 py-2 text-[14px] transition-colors ${f.role === r.id ? 'border-coffee bg-coffee text-linen-light' : 'border-coffee/20 text-coffee-soft hover:border-coffee/50'}`}>{L(r.l)}</button>
                  ))}
                </div>
              </fieldset>
              <label className="mt-5 block">
                <span className="label">{L({ ar: 'الخدمة المطلوبة', en: 'Service needed' })}</span>
                <select value={f.service} onChange={up('service')} {...fp('service')} className="input mt-1.5">
                  {services.map((s) => <option key={s.id} value={s.id}>{L(s.title)}</option>)}
                </select>
              </label>
              <div className="mt-5">{field('district', { ar: 'الحي (اختياري)', en: 'District (optional)' }, { ar: 'مثال: حي الجمعة', en: 'e.g. Al Jumuah' })}</div>
              <label className="mt-5 block">
                <span className="label">{L({ ar: 'تفاصيل الطلب', en: 'Request details' })}</span>
                <textarea rows={4} value={f.notes} onChange={up('notes')} {...fp('notes')} placeholder={L({ ar: 'صف طلبك باختصار...', en: 'Briefly describe what you need...' })} className="input mt-1.5 resize-none" />
              </label>
              <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-coffee px-6 py-3.5 text-[15px] font-medium text-linen-light transition-colors hover:bg-coffee-dark">
                <Send className="h-4 w-4 rtl:-scale-x-100" />{L({ ar: 'إرسال الطلب عبر واتساب', en: 'Send request via WhatsApp' })}
              </button>
              <p className="mt-3 text-center text-[12px] text-slate-light">{L({ ar: 'لا نحفظ بياناتك في الموقع؛ تُرسل مباشرةً إلى واتساب المكتب.', en: 'Nothing is stored on this site; your request goes straight to the office WhatsApp.' })}</p>
            </form>
          </Reveal>

          {/* the live document */}
          <Reveal delay={0.15} className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative">
              <div className="absolute inset-0 translate-y-3 rotate-[1.5deg] rounded-md bg-sand-light" />
              <div className="paper relative overflow-hidden rounded-md bg-white/90 px-6 py-8 shadow-[0_30px_60px_-30px_rgba(58,45,41,.5)] sm:px-10">
                <div className="flex items-center justify-between border-b-[3px] border-double border-coffee/30 pb-4">
                  <div className="flex items-center gap-3">
                    <Mark className="h-11 w-auto text-slate" stroke={18} />
                    <div className="leading-tight"><p className="font-display text-[17px] text-coffee">{t('brand')}</p><p className="text-[11px] text-sand-dark">{t('brand_sub')}</p></div>
                  </div>
                  <div className="text-end text-[12px] leading-5 text-slate-light"><p dir="ltr">{no}</p><p>{today}</p></div>
                </div>
                <p className="mt-6 text-center font-display text-xl text-coffee-dark">{L({ ar: 'طلب خدمة عقارية', en: 'Real Estate Service Request' })}</p>
                <div className="mt-5">
                  <DocLine label={L({ ar: 'مقدّم الطلب', en: 'Applicant' })} value={f.name} active={focus === 'name'} />
                  <DocLine label={L({ ar: 'الجوال', en: 'Mobile' })} value={f.phone} active={focus === 'phone'} />
                  <DocLine label={L({ ar: 'الصفة', en: 'Capacity' })} value={L(role.l)} active={false} />
                  <DocLine label={L({ ar: 'الخدمة', en: 'Service' })} value={svc ? L(svc.title) : ''} active={focus === 'service'} />
                  <DocLine label={L({ ar: 'الحي', en: 'District' })} value={f.district} active={focus === 'district'} />
                </div>
                <p className="mt-4 text-[13px] text-slate-light">{L({ ar: 'التفاصيل:', en: 'Details:' })}</p>
                <p className="mt-1 min-h-[72px] whitespace-pre-wrap bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_27px,rgba(90,70,65,.18)_27px,rgba(90,70,65,.18)_28px)] text-[15px] leading-[28px] text-coffee-dark">{f.notes}{focus === 'notes' && <span className="ms-0.5 inline-block h-4 w-px animate-pulse bg-coffee" />}</p>
                <div className="mt-8 flex items-end justify-between">
                  <div className="text-[12px] text-slate-light"><div className="mb-1 h-px w-32 bg-coffee/30" />{L({ ar: 'ختم المكتب', en: 'Office seal' })}</div>
                  <div className="relative h-28 w-28">
                    <AnimatePresence>
                      {sent && (
                        <motion.div className="absolute inset-0" initial={{ opacity: 0, scale: 2.2, rotate: -40 }} animate={{ opacity: 0.9, scale: 1, rotate: -12 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
                          <Seal spin={false} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {!sent && <div className="absolute inset-2 rounded-full border-2 border-dashed border-coffee/15" />}
                  </div>
                </div>
                <AnimatePresence>
                  {sent && (
                    <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: 0.3 }} className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-[14px] text-emerald-800 ring-1 ring-emerald-700/15">
                      {L({ ar: 'تم تجهيز طلبك وفتح واتساب لإرساله. إن لم يُفتح، تواصل معنا على ', en: 'Your request is ready and WhatsApp has opened to send it. If it didn’t open, message us on ' })}<a href={waLink()} target="_blank" rel="noreferrer" className="underline" dir="ltr">{office.phone}</a>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="paper bg-linen-light py-20">
        <div className="wrap">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Phone, k: t('call'), v: office.phone, href: `tel:${office.phoneIntl}`, ltr: true },
              { icon: MessageCircle, k: t('whatsapp'), v: office.phone, href: waLink(), ltr: true },
              { icon: Mail, k: L({ ar: 'البريد الإلكتروني', en: 'Email' }), v: office.email, href: `mailto:${office.email}` },
              { icon: MapPin, k: t('directions'), v: office.plus, href: office.maps, ltr: true },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="group flex h-full items-center gap-4 rounded-2xl bg-linen p-5 ring-1 ring-coffee/10 transition-all duration-500 hover:-translate-y-1 hover:bg-coffee">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-linen-light text-coffee transition-colors group-hover:bg-linen/15 group-hover:text-linen-light"><c.icon className="h-5 w-5" /></span>
                  <span className="min-w-0">
                    <span className="block text-[13px] text-sand-dark transition-colors group-hover:text-sand-light">{c.k}</span>
                    <span className="block truncate text-[15px] font-medium text-coffee-dark transition-colors group-hover:text-linen-light" dir={c.ltr ? 'ltr' : undefined} style={{ textAlign: 'start' }}>{c.v}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <Heading title={L({ ar: 'ساعات العمل', en: 'Working hours' })}>{L({ ar: 'بتوقيت المدينة المنورة', en: 'Madinah time' })}</Heading>
              <div className="mt-6"><WeekList /></div>
              <p className="mt-6 flex gap-3 text-[15px] leading-[1.8] text-coffee-soft"><MapPin className="mt-1 h-4 w-4 shrink-0 text-sand-dark" />{L(office.address)}</p>
            </div>
            <MapCard />
          </div>
        </div>
      </section>
    </>
  )
}
