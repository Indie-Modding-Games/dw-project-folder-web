import { HeroSection } from '../sections/HeroSection'
import { DownloadsSection } from '../sections/DownloadsSection'
import { MediaSection } from '../sections/MediaSection'
import { CommunitySection } from '../sections/CommunitySection'
import { DonateSection } from '../sections/DonateSection'
import { SiteFooter } from '../sections/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

/** Página principal: solo composición y orden, cero lógica (§10.1).
 *  El "qué es" vive fusionado dentro del HeroSection. */
export function HomeView() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <DownloadsSection />
        <MediaSection />
        <CommunitySection />
        <DonateSection />
      </main>
      <SiteFooter />
    </>
  )
}
