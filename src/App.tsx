import { AnimatePresence, MotionConfig } from 'framer-motion'
import { useEffect } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'
import Footer from './components/layout/Footer'
import LangInk from './components/layout/LangInk'
import Navbar from './components/layout/Navbar'
import Preloader from './components/layout/Preloader'
import QuickContact from './components/layout/QuickContact'
import SealTransition, { NextTitle } from './components/layout/SealTransition'
import { LangProvider, useLang } from './i18n/LangContext'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Properties from './pages/Properties'
import Services from './pages/Services'

function Pages() {
  const location = useLocation()
  const { t } = useLang()
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/services', element: <Services /> },
    { path: '/properties', element: <Properties /> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contact /> },
    { path: '*', element: <NotFound /> },
  ].map((r) => ({ ...r, element: <SealTransition>{r.element}</SealTransition> }))
  const el = useRoutes(routes, location)
  const p = location.pathname
  const title = p === '/' ? t('brand') : p === '/services' ? t('nav_services') : p === '/properties' ? t('nav_properties') : p === '/about' ? t('nav_about') : p === '/contact' ? t('nav_contact') : '404'
  useEffect(() => {
    document.title = p === '/' ? t('brand_full') : `${title} | ${t('brand_full')}`
  }, [title, p, t])

  return (
    <NextTitle.Provider value={title}>
      <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })}>
        {el && <div key={p}>{el}</div>}
      </AnimatePresence>
    </NextTitle.Provider>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LangProvider>
        <Preloader />
        <Navbar />
        <main id="main"><Pages /></main>
        <Footer />
        <QuickContact />
        <LangInk />
      </LangProvider>
    </MotionConfig>
  )
}
