import type { Preview } from '@storybook/nextjs-vite'
import { withThemeByClassName } from '@storybook/addon-themes'
import {
  Title,
  Subtitle,
  Primary,
  Controls,
  Stories,
  Unstyled,
  useOf,
} from '@storybook/addon-docs/blocks'

// Load the design-token layer (Tailwind v4 @theme inline + :root/.dark tokens)
import '../app/globals.css'

import { ComponentDocsSections } from '../components/component-docs-sections'
import { componentDetails } from '../lib/component-details'

// Map a story title ("Forms/Native Select") to a component slug ("native-select").
const slugFromTitle = (title: string) =>
  title.split('/').pop()?.trim().toLowerCase().replace(/\s+/g, '-') ?? ''

// Global autodocs page: standard blocks + our structured documentation
// (deliverable 2) pulled from componentDetails by slug. Undocumented slugs get
// the default blocks only. Single source of truth, shared with the docs site.
function DocsPage() {
  const resolved = useOf('meta', ['meta'])
  const title =
    'preparedMeta' in resolved ? (resolved.preparedMeta.title ?? '') : ''
  const detail = componentDetails[slugFromTitle(title)]
  return (
    <>
      <Title />
      <Subtitle />
      <Primary />
      <Controls />
      {detail ? (
        <Unstyled>
          <div className="bg-background text-foreground mt-8">
            <ComponentDocsSections detail={detail} />
          </div>
        </Unstyled>
      ) : null}
      <Stories />
    </>
  )
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      page: DocsPage,
    },
    a11y: {
      // 'todo' - show violations in the test UI only · 'error' - fail CI
      test: 'error',
    },
  },
  decorators: [
    // Toggles the `.dark` class on <html> — matches the project's
    // @custom-variant dark (&:is(.dark *)) token setup.
    withThemeByClassName({
      themes: { light: '', dark: 'dark' },
      defaultTheme: 'light',
      parentSelector: 'html',
    }),
    (Story) => (
      <div className="bg-background text-foreground min-h-svh p-8">
        <Story />
      </div>
    ),
  ],
}

export default preview
