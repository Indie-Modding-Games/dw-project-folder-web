import { useTheme } from '../hooks/useTheme'
import { Icon } from '../ui/Icon'

/** Conmutador claro/oscuro (persistido; selecciona los tokens CSS). */
export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      type="button"
      className="switcher-item icon-btn"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'cambiar a tema claro' : 'cambiar a tema oscuro'}
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} />
    </button>
  )
}
