import type { Bi } from '../i18n/LangContext'

export const office = {
  phone: '0550762404',
  phoneIntl: '+966550762404',
  wa: '966550762404',
  email: 'mwathyqalnma@gmail.com',
  person: { ar: 'فهد عبدالله الحربي', en: 'Fahad Abdullah Al-Harbi' } as Bi,
  role: { ar: 'عن مكتب مواثيق النماء', en: 'On behalf of Mawathiq Al-Namaa' } as Bi,
  address: { ar: 'حي الجمعة، شارع الإمام أحمد بن حنبل، المدينة المنورة 42316', en: 'Al Jumuah, Imam Ahmad bin Hanbal St, Madinah 42316' } as Bi,
  plus: 'FJ37+WW Madinah',
  maps: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('FJ37+WW Madinah, Saudi Arabia'),
}
export const waLink = (text = '') => `https://wa.me/${office.wa}${text ? `?text=${encodeURIComponent(text)}` : ''}`

/** Working hours — Madinah time (Asia/Riyadh). Day index: 0 = Sunday. */
export const hours: { day: number; name: Bi; open?: [number, number] }[] = [
  { day: 0, name: { ar: 'الأحد', en: 'Sunday' }, open: [15, 22] },
  { day: 1, name: { ar: 'الاثنين', en: 'Monday' }, open: [15, 22] },
  { day: 2, name: { ar: 'الثلاثاء', en: 'Tuesday' }, open: [15, 22] },
  { day: 3, name: { ar: 'الأربعاء', en: 'Wednesday' }, open: [15, 22] },
  { day: 4, name: { ar: 'الخميس', en: 'Thursday' }, open: [15, 22] },
  { day: 5, name: { ar: 'الجمعة', en: 'Friday' } },
  { day: 6, name: { ar: 'السبت', en: 'Saturday' } },
]

export type ServiceId = 'management' | 'marketing' | 'trade' | 'contracts'
export type Service = { id: ServiceId; no: string; title: Bi; short: Bi; body: Bi; points: Bi[]; steps: Bi[] }

export const services: Service[] = [
  {
    id: 'management', no: '01',
    title: { ar: 'إدارة الأملاك', en: 'Property Management' },
    short: { ar: 'نرعى عقارك كأنه لنا: تحصيل، صيانة، ومتابعة المستأجرين.', en: 'We look after your property as if it were ours: rent, upkeep and tenants.' },
    body: { ar: 'نتولى إدارة العمائر والشقق والمحلات نيابةً عنك، من اختيار المستأجر المناسب وتوثيق العقد، إلى تحصيل الإيجارات ومتابعة الصيانة وتقديم تقارير دورية واضحة.', en: 'We manage buildings, apartments and shops on your behalf, from selecting the right tenant and documenting the lease to collecting rent, following up maintenance and sending clear periodic reports.' },
    points: [
      { ar: 'تحصيل الإيجارات ومتابعة المتأخرات', en: 'Rent collection and arrears follow-up' },
      { ar: 'صيانة دورية وطارئة', en: 'Routine and emergency maintenance' },
      { ar: 'تقارير شهرية للمالك', en: 'Monthly owner reports' },
      { ar: 'تجديد العقود وإنهاؤها نظاميًا', en: 'Lawful lease renewals and terminations' },
    ],
    steps: [
      { ar: 'معاينة العقار وتقييم حالته', en: 'Inspect and assess the property' },
      { ar: 'توقيع اتفاقية الإدارة', en: 'Sign the management agreement' },
      { ar: 'التأجير والتحصيل والمتابعة', en: 'Lease, collect and follow up' },
      { ar: 'تقرير دوري للمالك', en: 'Periodic report to the owner' },
    ],
  },
  {
    id: 'marketing', no: '02',
    title: { ar: 'التسويق العقاري', en: 'Real Estate Marketing' },
    short: { ar: 'نعرض عقارك للمشتري أو المستأجر المناسب بأفضل صورة.', en: 'We put your property in front of the right buyer or tenant, at its best.' },
    body: { ar: 'تصوير احترافي، ووصف دقيق، وتسعير مدروس وفق السوق في المدينة المنورة، ثم نشر مدروس عبر القنوات المناسبة ومتابعة كل استفسار حتى إتمام الصفقة.', en: 'Professional photography, accurate descriptions and market-based pricing for Madinah, then targeted listing across the right channels and follow-up on every enquiry until the deal closes.' },
    points: [
      { ar: 'دراسة سعرية للعقار', en: 'Market pricing study' },
      { ar: 'تصوير وعرض احترافي', en: 'Professional photos and listing' },
      { ar: 'نشر عبر المنصات المرخصة', en: 'Listing on licensed platforms' },
      { ar: 'تنسيق المعاينات', en: 'Viewing coordination' },
    ],
    steps: [
      { ar: 'دراسة العقار والسعر', en: 'Study the property and price' },
      { ar: 'التصوير وإعداد الإعلان', en: 'Photograph and prepare the listing' },
      { ar: 'النشر واستقبال العملاء', en: 'Publish and receive clients' },
      { ar: 'التفاوض حتى الإغلاق', en: 'Negotiate through to closing' },
    ],
  },
  {
    id: 'trade', no: '03',
    title: { ar: 'خدمات البيع والشراء', en: 'Buying & Selling' },
    short: { ar: 'نرافقك في كل خطوة حتى نقل الملكية بأمان.', en: 'We walk with you, step by step, to a safe transfer of ownership.' },
    body: { ar: 'سواء كنت تبحث عن منزل أو أرض أو استثمار، أو تريد بيع عقارك؛ نساعدك في البحث والمقارنة والتفاوض والتحقق من الصكوك حتى الإفراغ.', en: 'Whether you are looking for a home, land or an investment, or selling your own property, we help with searching, comparing, negotiating and verifying deeds all the way to transfer.' },
    points: [
      { ar: 'البحث حسب الميزانية والحي', en: 'Search by budget and district' },
      { ar: 'التحقق من الصك والمخططات', en: 'Deed and plan verification' },
      { ar: 'التفاوض نيابةً عنك', en: 'Negotiation on your behalf' },
      { ar: 'متابعة الإفراغ', en: 'Ownership transfer follow-up' },
    ],
    steps: [
      { ar: 'فهم احتياجك وميزانيتك', en: 'Understand your needs and budget' },
      { ar: 'ترشيح الخيارات والمعاينة', en: 'Shortlist and view options' },
      { ar: 'التفاوض والتحقق', en: 'Negotiate and verify' },
      { ar: 'الإفراغ والتسليم', en: 'Transfer and handover' },
    ],
  },
  {
    id: 'contracts', no: '04',
    title: { ar: 'إنشاء وتوثيق العقود', en: 'Contract Drafting & Documentation' },
    short: { ar: 'عقود واضحة وموثقة تحفظ حقوق جميع الأطراف.', en: 'Clear, documented contracts that protect every party.' },
    body: { ar: 'نصيغ عقود الإيجار والبيع والوساطة بوضوح، ونوثقها عبر المنصات المعتمدة، ونشرح لكل طرف حقوقه والتزاماته قبل التوقيع.', en: 'We draft lease, sale and brokerage contracts clearly, document them through the approved platforms, and explain each party’s rights and obligations before signing.' },
    points: [
      { ar: 'عقود الإيجار السكنية والتجارية', en: 'Residential and commercial leases' },
      { ar: 'عقود البيع والوساطة', en: 'Sale and brokerage contracts' },
      { ar: 'التوثيق عبر المنصات المعتمدة', en: 'Documentation on approved platforms' },
      { ar: 'مراجعة العقود القائمة', en: 'Review of existing contracts' },
    ],
    steps: [
      { ar: 'جمع بيانات الأطراف والعقار', en: 'Collect party and property details' },
      { ar: 'صياغة البنود ومراجعتها', en: 'Draft and review the clauses' },
      { ar: 'التوقيع والتوثيق', en: 'Sign and document' },
      { ar: 'تسليم نسخة موثقة', en: 'Hand over the documented copy' },
    ],
  },
]

export type Purpose = 'sale' | 'rent'
export type PType = 'apartment' | 'villa' | 'land' | 'shop' | 'building'
export type Property = { id: string; ref: string; purpose: Purpose; type: PType; title: Bi; district: Bi; price: number; period?: 'year'; area: number; beds?: number; baths?: number; desc: Bi; image: string }

export const types: { id: PType; label: Bi }[] = [
  { id: 'apartment', label: { ar: 'شقة', en: 'Apartment' } },
  { id: 'villa', label: { ar: 'فيلا', en: 'Villa' } },
  { id: 'land', label: { ar: 'أرض', en: 'Land' } },
  { id: 'shop', label: { ar: 'محل تجاري', en: 'Shop' } },
  { id: 'building', label: { ar: 'عمارة', en: 'Building' } },
]

// Demo listings — replace with the office's real listings after approval.
export const properties: Property[] = [
  { id: 'p1', ref: 'MN-1041', purpose: 'rent', type: 'apartment', title: { ar: 'شقة عائلية بالقرب من المسجد النبوي', en: 'Family apartment near the Prophet’s Mosque' }, district: { ar: 'حي الجمعة', en: 'Al Jumuah' }, price: 38000, period: 'year', area: 165, beds: 4, baths: 3, desc: { ar: 'شقة واسعة في الدور الثاني، مدخل مستقل، مطبخ راكب، ومواقف خاصة.', en: 'Spacious second-floor apartment with a private entrance, fitted kitchen and private parking.' }, image: 'prop-1' },
  { id: 'p2', ref: 'MN-1042', purpose: 'sale', type: 'villa', title: { ar: 'فيلا دورين مع ملحق', en: 'Two-storey villa with annex' }, district: { ar: 'حي الخالدية', en: 'Al Khalidiyah' }, price: 1850000, area: 400, beds: 6, baths: 5, desc: { ar: 'فيلا حديثة التشطيب على شارعين، مجلس رجال وصالة عائلية وحديقة.', en: 'Newly finished corner villa on two streets with a majlis, family lounge and garden.' }, image: 'prop-2' },
  { id: 'p3', ref: 'MN-1043', purpose: 'sale', type: 'land', title: { ar: 'أرض سكنية على شارع 20م', en: 'Residential plot on a 20 m street' }, district: { ar: 'حي العزيزية', en: 'Al Aziziyah' }, price: 920000, area: 625, desc: { ar: 'أرض مستوية بصك إلكتروني، قريبة من الخدمات والمدارس.', en: 'Level plot with an electronic deed, close to services and schools.' }, image: 'prop-3' },
  { id: 'p4', ref: 'MN-1044', purpose: 'rent', type: 'shop', title: { ar: 'محل تجاري على شارع رئيسي', en: 'Retail shop on a main road' }, district: { ar: 'شارع الإمام أحمد بن حنبل', en: 'Imam Ahmad bin Hanbal St' }, price: 60000, period: 'year', area: 90, desc: { ar: 'واجهة زجاجية، ارتفاع مناسب لميزانين، وحركة مرور عالية.', en: 'Glass frontage, height suitable for a mezzanine, and heavy passing traffic.' }, image: 'prop-4' },
  { id: 'p5', ref: 'MN-1045', purpose: 'sale', type: 'building', title: { ar: 'عمارة سكنية استثمارية', en: 'Residential investment building' }, district: { ar: 'حي قباء', en: 'Quba' }, price: 4200000, area: 520, desc: { ar: '12 شقة مؤجرة بالكامل، دخل سنوي ثابت، وصيانة حديثة.', en: '12 fully let apartments, stable annual income and recent maintenance.' }, image: 'prop-5' },
  { id: 'p6', ref: 'MN-1046', purpose: 'rent', type: 'apartment', title: { ar: 'شقة ثلاث غرف بتشطيب حديث', en: 'Modern three-bedroom apartment' }, district: { ar: 'حي العوالي', en: 'Al Awali' }, price: 28000, period: 'year', area: 130, beds: 3, baths: 2, desc: { ar: 'عمارة جديدة بمصعد، قريبة من الطريق الدائري.', en: 'New building with a lift, close to the ring road.' }, image: 'prop-6' },
  { id: 'p7', ref: 'MN-1047', purpose: 'sale', type: 'apartment', title: { ar: 'شقة تمليك بإطلالة', en: 'Freehold apartment with a view' }, district: { ar: 'حي الراية', en: 'Al Rayah' }, price: 690000, area: 180, beds: 4, baths: 3, desc: { ar: 'دور أخير مع سطح خاص، غرفة خادمة، ومواقف.', en: 'Top floor with a private roof, maid’s room and parking.' }, image: 'prop-7' },
  { id: 'p8', ref: 'MN-1048', purpose: 'rent', type: 'villa', title: { ar: 'فيلا للإيجار مع مسبح', en: 'Villa for rent with pool' }, district: { ar: 'حي الملك فهد', en: 'King Fahd District' }, price: 95000, period: 'year', area: 450, beds: 5, baths: 5, desc: { ar: 'فيلا مؤثثة جزئيًا، مسبح وحديقة ومجلس خارجي.', en: 'Partly furnished villa with a pool, garden and outdoor majlis.' }, image: 'prop-8' },
  { id: 'p9', ref: 'MN-1049', purpose: 'sale', type: 'land', title: { ar: 'أرض تجارية على زاوية', en: 'Corner commercial plot' }, district: { ar: 'حي السيح', en: 'Al Saih' }, price: 2600000, area: 900, desc: { ar: 'أرض تجارية على شارعين، مناسبة لمعارض أو مجمع تجاري.', en: 'Commercial plot on two streets, suited to showrooms or a retail complex.' }, image: 'prop-9' },
]

export const faqs: { q: Bi; a: Bi }[] = [
  { q: { ar: 'هل تقدمون خدماتكم خارج المدينة المنورة؟', en: 'Do you work outside Madinah?' }, a: { ar: 'نركز على المدينة المنورة وأحيائها، ويمكن التنسيق للطلبات القريبة بعد التواصل معنا.', en: 'We focus on Madinah and its districts; nearby requests can be arranged after contacting us.' } },
  { q: { ar: 'ما المستندات المطلوبة لتوثيق عقد إيجار؟', en: 'What documents are needed to document a lease?' }, a: { ar: 'هوية الأطراف، صك الملكية أو الوكالة، وبيانات العقار. نرشدك لأي متطلبات إضافية حسب نوع العقد.', en: 'IDs of the parties, the title deed or power of attorney, and property details. We guide you on any extra requirements for your contract type.' } },
  { q: { ar: 'كيف أعرف قيمة عقاري قبل البيع؟', en: 'How do I know my property’s value before selling?' }, a: { ar: 'نزور العقار ونقارنه بصفقات مشابهة في الحي لنقدم لك تقديرًا سعريًا واقعيًا.', en: 'We visit the property and compare it with similar recent deals in the district to give you a realistic price estimate.' } },
  { q: { ar: 'هل يمكنني زيارة المكتب دون موعد؟', en: 'Can I visit the office without an appointment?' }, a: { ar: 'نعم، خلال ساعات العمل من الأحد إلى الخميس من 3 عصرًا حتى 10 مساءً. ويُفضّل التواصل مسبقًا.', en: 'Yes, during working hours, Sunday to Thursday, 3 PM to 10 PM. Calling ahead is recommended.' } },
]
