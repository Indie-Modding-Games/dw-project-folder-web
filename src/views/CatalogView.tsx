import { useI18n } from '../i18n/context'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Chip } from '../ui/Chip'
import { ExternalLink } from '../ui/ExternalLink'
import { Icon, type IconName } from '../ui/Icon'
import { KeyValue } from '../ui/KeyValue'
import { ProgressBadge } from '../ui/ProgressBadge'
import { SectionTitle } from '../ui/SectionTitle'
import { Grid, Separator, Stack } from '../ui/Stack'
import { links } from '../content/links'

const ICON_NAMES: IconName[] = [
  'download', 'external', 'play', 'copy', 'check', 'sun', 'moon', 'globe',
  'github', 'discord', 'youtube', 'kofi', 'patreon', 'linux', 'windows', 'book', 'heart', 'bug',
]

/**
 * Catálogo interno de diseño (solo dev): muestra cada átomo/molécula del sistema.
 * Ruta /dev/catalog — sirve de contrato visual para no duplicar componentes.
 */
export function CatalogView() {
  const { t } = useI18n()
  return (
    <div className="container catalog">
      <SectionTitle id="catalog" eyebrow="/dev/catalog" title={t('catalog.title')} subtitle={t('catalog.note')} />

      <Stack gap="lg">
        <div>
          <h3>Button</h3>
          <Stack gap="sm" wrap>
            <Button href="#top">primary</Button>
            <Button href={links.github} external variant="ghost">ghost</Button>
            <Button icon="download" size="sm">icon + sm</Button>
            <Button disabled>disabled</Button>
          </Stack>
        </div>

        <div>
          <h3>Badge / Chip</h3>
          <Stack gap="sm" wrap>
            <Badge tone="success">success</Badge>
            <Badge tone="warn">warn</Badge>
            <Badge tone="neutral">neutral</Badge>
            <Badge tone="accent">accent</Badge>
            <Chip>Vulkan 1.3</Chip>
            <Chip>SDL3</Chip>
          </Stack>
        </div>

        <div>
          <h3>Icon</h3>
          <div className="icon-wall">
            {ICON_NAMES.map((name) => (
              <span key={name} className="icon-cell" title={name}>
                <Icon name={name} size={22} />
                <small>{name}</small>
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3>KeyValue + CopyButton + ProgressBadge</h3>
          <Card>
            <div className="kv-list">
              <KeyValue label="SHA-256" value="a1b2c3d4e5f6…" copyText="a1b2c3d4e5f6000000000000000000000000000000000000000000000000" copyLabel="copiar" copiedLabel="¡Copiado!" />
              <KeyValue label="Tamaño" value="~260 MB" />
            </div>
            <Separator />
            <ProgressBadge
              phases={[
                { status: 'almost', label: 'Fase 0' },
                { status: 'done', label: 'Fase 1' },
                { status: 'done', label: 'Fase 2' },
                { status: 'wip', label: 'Fase 3' },
                { status: 'todo', label: 'Fase 4' },
              ]}
            />
          </Card>
        </div>

        <div>
          <h3>Card + ExternalLink</h3>
          <Grid cols={2}>
            <Card eyebrow="eyebrow" title="Título de tarjeta" footer={<Button size="sm" variant="ghost">footer</Button>}>
              <p className="card-text">Cuerpo libre con {t('brand.name')}.</p>
            </Card>
            <Card title="Enlaces">
              <Stack>
                <ExternalLink href={links.github}>GitHub</ExternalLink>
                <ExternalLink href={links.docs}>Documentación</ExternalLink>
              </Stack>
            </Card>
          </Grid>
        </div>
      </Stack>
    </div>
  )
}
