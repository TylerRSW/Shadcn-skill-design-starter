import type { Preview } from '@storybook/nextjs-vite'
import { withThemeByClassName } from '@storybook/addon-themes'

// Load the design-token layer (Tailwind v4 @theme inline + :root/.dark tokens)
import '../app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show violations in the test UI only · 'error' - fail CI
      test: 'todo',
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
