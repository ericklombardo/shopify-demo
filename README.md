# Thank You Messages Shopify App

This app is using a template for building a [Shopify app](https://shopify.dev/docs/apps/getting-started) using Node and React. 
It contains the basics building blocks for starting to building a Shopify app using the new Shopify CLI version 3.x.

This is a simple app that allows the merchant to setup a custom **thank you message** to their customers.
The app install a admin section in the merchant's store, where they can create, update, delete and view the messages history.
The custom **thank you message** is displayed in the customer online store in the order confirmation page.

This app uses [SQLite](https://www.sqlite.org/index.html) to store session data and messages by shopify merchant. The database is a file called `messages.sqlite`.
Because we are using prisma to manage the database, you can easily change the database to any of the supported databases by prisma.


## Tech Stack

This app combines a number of third party open-source tools:

- [TypeScript](https://typescriptlang.org). TypeScript is a typed superset of JavaScript that compiles to plain JavaScript, provider several benefits over plain JavaScript like the ability to catch errors at compile time, better tooling support, improved code readability, and more.
- [Express](https://expressjs.com/) builds the backend.
- [Vite](https://vitejs.dev/) Help for building and debugging the [React](https://reactjs.org/) frontend.
- [React](https://reactjs.org/). React is a JavaScript library for building user interfaces, using shopify specific libraries for building apps like [App Bridge React](https://shopify.dev/tools/app-bridge) and [Polaris React](https://polaris.shopify.com/).
- [Prisma](https://www.prisma.io/). Prisma is a typescript ORM that makes it easy to query, migrate, and model your database. You could follow a code first approach with dealing with the database.
- [React Router](https://reactrouter.com/) is used for routing. We wrap this with file-based routing.
- [React Query](https://react-query.tanstack.com/) queries the Admin API.

The following Shopify tools complement these third-party tools to ease app development:

- [Shopify CLI](https://shopify.dev/tools/cli). The Shopify CLI is a command line interface that allows you to quickly and easily create and manage Shopify apps, themes, and scripts.
- [Shopify API library](https://github.com/Shopify/shopify-node-api) adds OAuth to the Express backend. This lets users install the app and grant scope permissions.
- [App Bridge React](https://shopify.dev/docs/apps/tools/app-bridge/getting-started/using-react) adds authentication to API requests in the frontend and renders components outside of the App’s iFrame.
- [Polaris React](https://polaris.shopify.com/) is a powerful design system and component library that helps developers build high quality, consistent experiences for Shopify merchants.
- [File-based routing](https://github.com/Shopify/shopify-frontend-template-react/blob/main/Routes.jsx) makes creating new pages easier.

## Coding style guide and best practices

1. This app uses [Prettier](https://prettier.io/) to format code. Prettier is an opinionated code formatter that enforces a consistent style. It removes all original styling and ensures that all outputted code conforms to a consistent style. This makes it easier to read and maintain code.
1. This app uses [ESLint](https://eslint.org/) to lint code.
1. Prettier and ESLint are run as part of the IDE integration of your choice. The recommended IDE are [Visual Studio Code](https://code.visualstudio.com/). or [WebStorm](https://www.jetbrains.com/webstorm/).
1. This app use strong and consistent typing, interfaces and types for defining complex data structures. This makes it easier to read and maintain code.
1. Use async/await instead of callbacks and promises. Javascript/TypeScript supports async/await, which provides a more readable way to write asynchronous code.
1. Use conventional commit messages. This app uses [commitlint](https://commitlint.js.org/#/) to lint commit messages. This ensures that commit messages are formatted correctly and that they follow the [conventional commit message format](https://www.conventionalcommits.org/en/v1.0.0/).

## Getting started

### Requirements

1. You must [download and install Node.js](https://nodejs.org/en/download/) if you don't already have it.
1. You must install the [Shopify CLI](https://shopify.dev/tools/cli).
1. You must [create a Shopify partner account](https://partners.shopify.com/signup) if you don’t have one.
1. You must create a store for testing if you don't have one, either a [development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) or a [Shopify Plus sandbox store](https://help.shopify.com/en/partners/dashboard/managing-stores/plus-sandbox-store).

### Local Testing

[The Shopify CLI](https://shopify.dev/docs/apps/tools/cli) connects the app in your Partners dashboard. It provides environment variables, runs commands in parallel, and updates application URLs for easier development.

#### Install the app

1. Clone this repository.
1. Install the packages for the main app, the backend and frontend:

```shell
npm install
npm --prefix ./web/frontend install
npm --prefix ./web/backend install
``` 

#### Setup ngrok

1. You need to create a ngrok account and get your auth token. You can get it from [here](https://dashboard.ngrok.com/auth/your-authtoken).
1. Saves a token to authenticate with ngrok. You can do it by running the following command:

```shell
npm run shopify ngrok auth [TOKEN]
```

#### Run the app

1. Run the app in development mode:

```shell
npm run dev
```

Open the URL generated in your console. Once you grant permission to the app, you can start the local testing.

### Cloud testing

The app is hosting in [Fly.io](https://fly.io/), a cloud platform that makes it easy to deploy and scale apps. Fly is a great way to test your app in a production-like environment.

1. From the Partner Dashboard create a new app.
1. Create an app from scratch with a name.
1. Go to the app setup page and set the **App URL** to https://thank-you.fly.dev/.
1. Set the **Allowed redirection URL(s)** to:
   1. https://thank-you.fly.dev/auth/callback.
   1. https://thank-you.fly.dev/auth/shopify/callback
   1. https://thank-you.fly.dev/api/auth/callback
1. Go to your new app and select a **test store**.

