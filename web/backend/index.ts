import { join, resolve } from "path";
import { readFileSync } from "fs";
import express, { Express } from "express";
import serveStatic from "serve-static";

import shopify from "./shopify";
import GDPRWebhookHandlers from "./gdpr";
import { applyMessagesApiEndpoints } from "./middleware/messages-api";

const PORT = parseInt(
  (process.env.BACKEND_PORT as string) || (process.env.PORT as string),
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : resolve(process.cwd(), "../frontend");

const app: Express = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// All endpoints after this point will require an active session
app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

applyMessagesApiEndpoints(app);

app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
