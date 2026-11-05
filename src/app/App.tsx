import { LangProvider } from '../i18n/LangProvider'
import { CatalogView } from '../views/CatalogView'
import { HomeView } from '../views/HomeView'

/** Raíz de composición: providers + selección de vista (dev: /dev/catalog). */
export default function App() {
  const showCatalog = import.meta.env.DEV && window.location.pathname.startsWith('/dev/catalog')
  return <LangProvider>{showCatalog ? <CatalogView /> : <HomeView />}</LangProvider>
}
