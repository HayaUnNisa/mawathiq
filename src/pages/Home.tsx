import Charter from '../components/home/Charter'
import CtaBand from '../components/home/CtaBand'
import FeaturedFiles from '../components/home/FeaturedFiles'
import Hero from '../components/home/Hero'
import HoursMap from '../components/home/HoursMap'
import Rise from '../components/home/Rise'
import ServiceScrolls from '../components/home/ServiceScrolls'

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceScrolls />
      <Charter />
      <Rise />
      <FeaturedFiles />
      <HoursMap />
      <CtaBand />
    </>
  )
}
