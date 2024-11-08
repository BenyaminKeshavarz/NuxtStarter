# NuxtStarter (Super)

`NuxtStarter` is a flexible and modern **Nuxt 3-based** starter template, designed with **Nuxt 4** compatibility in mind. It is optimized for building fast, SEO-friendly web applications. With full-configured Tailwind CSS, internationalization (i18n), API endpoint management, and more, this template provides a solid foundation for developing your Nuxt-based web app.

## Features

- **Nuxt 3 & Nuxt 4 Compatibility**: Built with Nuxt 3, but fully compatible with Nuxt 4, ensuring smooth upgrades and long-term maintainability.

- **Tailwind CSS**: Utility-first CSS framework integrated for rapid styling and responsive design.

- **Internationalization (i18n)**: Multi-language support with built-in English and Persian locales.

- **SEO Optimized**: Automatic meta tags, title configuration, and Google Analytics integration.

- **State Management**: Pinia for modern state management.

- **Component Library**: Radix UI for accessible components.

- **Form Validation**: VeeValidate for form handling and validation.

- **API Configurations**: Centralized API endpoint management for your project.

- **Full Documentation:** Every file and section in the template is thoroughly documented to ensure clarity. Developers can easily follow and understand the setup, making the template easier to work with and extend.


## Modules

This template includes the following Nuxt modules and extensions to enhance the functionality and experience of your application:

- **[Radix UI for Nuxt](https://radix-ui.com/docs/primitives)**: Provides accessibility-first components, ensuring your app is inclusive and usable for everyone.
- **[Nuxt Google Analytics (nuxt-gtag)](https://nuxt.com/modules/gtag)**: Easily integrates Google Analytics for tracking user interactions and improving app insights.
- **[Nuxt Tailwind CSS](https://nuxt.com/modules/tailwindcss)**: A utility-first CSS framework to help style your app with minimal effort, ensuring flexibility and scalability.
- **[Nuxt Lodash](https://nuxt.com/modules/lodash)**: A utility library that simplifies working with arrays, numbers, objects, strings, etc.
- **[Nuxt Image](https://nuxt.com/modules/image)**: Provides automatic image optimization, allowing your app to serve images in the best format and size for performance.
- **[VeeValidate for Nuxt](https://vee-validate.logaretm.com/v4/getting-started/)**: Provides form validation for Nuxt, simplifying form handling and ensuring validation rules are followed.
- **[Nuxt SEO](https://nuxtjs.org/docs/seo/)**: A set of tools to optimize your app for search engines, ensuring better visibility and ranking.
- **[Nuxt i18n](https://i18n.nuxtjs.org/)**: Internationalization support, enabling your app to serve multiple languages and support global users.
- **[Nuxt Icon](https://nuxt.com/modules/icon)**: Simplifies adding and using SVG icons within your Nuxt app.
- **[Pinia for Nuxt](https://pinia.vuejs.org/)**: A state management library for Vue 3, designed for simplicity and better performance.

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more about Nuxt 3.

## Getting Started

To get started with the NuxtStarter template, follow these steps:

### Prerequisites

- **[NPM](https://www.npmjs.com/)** - Node.js package manager, which is required to manage project dependencies. 

- **[Node.js 20+](https://nodejs.org)** - Make sure you have Node.js version 20 or higher installed. You can check your Node.js version by running `node -v` in your terminal.

### Installation

1. Clone the repository

```bash
git clone https://github.com/BenyaminKeshavarz/NuxtStarter.git
```

2. Install dependencies

```bash
npm install
```

3. Prepare the environment

Copy the `.env.example` file to `.env` and fill in the necessary information

```bash
cp .env.example .env
```
## Development Server

Start the Nuxt development server on `http://localhost:3000`:

```bash
npm run dev
```

## Build for Production (SSG)

When you're ready to deploy and generate a fully static site, build the project for production:

```bash
npm run generate
```

## Build for Production

When you're ready to deploy, build the project for production:

```bash
npm run build
```

## Preview the Production Build

To preview your production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Contributing ✨

Feel free to contribute to the project! If you find bugs or have feature suggestions, please open an issue or create a pull request.