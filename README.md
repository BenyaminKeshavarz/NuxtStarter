# NuxtStarter v2.0.0

`NuxtStarter` is a modern **Nuxt 4** starter template for building fast, SEO-friendly, and type-safe web applications. It ships with Tailwind CSS v4, Nuxt UI, internationalization (Persian & English), centralized API setup, and a documented project structure you can extend quickly.

## Tech Stack

| Category | Version |
| --- | --- |
| Nuxt | ^4.4 |
| Vue | ^3.5 |
| TypeScript | ^6.0 (strict + type check) |
| Tailwind CSS | ^4.3 |
| Nuxt UI | ^4.8 |
| Pinia | ^3.0 |
| Node.js | >= 20 |
| pnpm | >= 9 |

## Features

- **Nuxt 4**: Built on Nuxt 4 with strict TypeScript, ESLint, and runtime type checking enabled.
- **Nuxt UI + Tailwind CSS v4**: Accessible UI components, dark mode (default), fonts, and icons via Nuxt UI; Tailwind v4 integrated through the Vite plugin.
- **Internationalization (i18n)**: English (default, LTR) and Persian locales with locale-aware date, number, and currency formatters.
- **SEO**: Meta tags, schema, sitemap, and static OG image generation via `@nuxtjs/seo`.
- **State Management**: Pinia with a starter store setup.
- **Form Validation**: Reusable Zod schemas for common fields (phone, email, national code, and more).
- **API Layer**: Centralized API configuration, error handling, and example composables for client/server requests.
- **Utilities & Composables**: Carousel (Embla), sticky positioning, scroll helpers, local storage, overlay state, and more.
- **Input Masking**: `maska` directive for formatted inputs.
- **Documentation**: Detailed guides in the [`docs/`](./docs/) folder for composables, plugins, directives, and utilities.

## Modules & Libraries

This template includes the following Nuxt modules and key dependencies:

- **[Nuxt UI](https://ui.nuxt.com/)**: Component library built on Reka UI with Tailwind CSS, icons, color mode, and fonts.
- **[Nuxt Image](https://nuxt.com/modules/image)**: Automatic image optimization and responsive delivery.
- **[Nuxt SEO](https://nuxtseo.com/)** (`@nuxtjs/seo`): SEO toolkit including sitemap, schema.org, and OG images.
- **[Nuxt i18n](https://i18n.nuxtjs.org/)**: Multi-language routing and locale management.
- **[Pinia for Nuxt](https://pinia.vuejs.org/)**: State management for Vue 3.
- **[Nuxt ESLint](https://eslint.nuxt.com/)**: Linting integrated into the Nuxt toolchain.
- **[VueUse](https://vueuse.org/)**: Collection of essential Vue composables.
- **[Zod](https://zod.dev/)**: Schema validation for forms and API payloads.
- **[Embla Carousel](https://www.embla-carousel.com/)**: Lightweight carousel for Vue.
- **[Reka UI](https://reka-ui.com/)**: Headless accessible primitives (used directly where needed).
- **[Maska](https://beholdr.github.io/maska/)**: Input masking for formatted fields.

See the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) for more about the framework.

## Project Structure

```
app/
├── assets/          # CSS, fonts, icons, images
├── components/      # Vue components (explicit imports)
├── composables/     # API, i18n, and utility composables
├── directives/      # Custom Vue directives
├── layouts/         # App layouts
├── pages/           # File-based routes
├── plugins/         # Nuxt plugins (API client, directives)
├── stores/          # Pinia stores
├── types/           # TypeScript type definitions
└── utils/           # Helpers and Zod schemas
docs/                # In-repo documentation
i18n/locales/        # Translation files (fa, en)
```

## Getting Started

### Prerequisites

- **[Node.js 20+](https://nodejs.org)** — Check your version with `node -v`.
- **[pnpm 9+](https://pnpm.io/)** — This project uses pnpm as its package manager. Check with `pnpm -v`.

### Installation

1. Clone the repository

```bash
git clone https://github.com/BenyaminKeshavarz/NuxtStarter.git
cd NuxtStarter
```

2. Install dependencies

```bash
pnpm install
```

3. Prepare the environment

Copy `.env.example` to `.env` and fill in the required values:

```bash
cp .env.example .env
```

Key environment variables:

| Variable | Description |
| --- | --- |
| `PORT` | Dev server port (default: `3050`) |
| `NUXT_SERVER_API_BASE_URL` | Server-side API base URL (SSR) |
| `NUXT_PUBLIC_CLIENT_API_BASE_URL` | Client-side API base URL |
| `NUXT_PUBLIC_ASSETS_BASE_URL` | CDN/storage base for media paths |
| `NUXT_PUBLIC_API_VERSION` | Sent as `X-Version` header on API requests |
| `NUXT_PUBLIC_DASHBOARD_URL` | Optional admin panel URL |

## Development Server

Start the Nuxt development server on `http://localhost:3050` (or the port set in `.env`):

```bash
pnpm dev
```

## Build for Production (SSG)

Generate a fully static site:

```bash
pnpm generate
```

## Build for Production (SSR)

Build for server-side rendering deployment:

```bash
pnpm build
```

## Preview the Production Build

Preview the production build locally:

```bash
pnpm preview
```

See the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for hosting options.

## Documentation

Additional guides live in the [`docs/`](./docs/) directory:

- [API composables](./docs/composables/api.md)
- [API plugin](./docs/plugins/api.md)
- [i18n composables](./docs/composables/i18n.md)
- [Utility composables](./docs/composables/utility.md)
- [Directives](./docs/directives.md)
- [Utils & schemas](./docs/utils.md)

## Contributing

Contributions are welcome. If you find bugs or have feature suggestions, please open an issue or create a pull request.
