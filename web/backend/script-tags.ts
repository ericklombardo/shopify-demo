import shopify from "./shopify";
import { SessionRepository } from "./prisma/database";

export const installScriptTags = async (shop: string, url: string) => {
  const scriptSrc = `${url}/assets/js/order-status.js`;
  const session = (await SessionRepository.findSessionsByShop(shop))[0];
  console.log(`Getting script tags for ${shop} at ${scriptSrc}`);
  const scriptTags = await shopify.api.rest.ScriptTag.all({
    session,
    src: scriptSrc,
  });
  if (!scriptTags?.length) {
    console.log(`Installing script tag for ${shop} at ${scriptSrc}`);
    const scriptTag = new shopify.api.rest.ScriptTag({ session });
    scriptTag.src = scriptSrc;
    scriptTag.event = "onload";
    scriptTag.display_scope = "order_status";
    await scriptTag.save({ update: true });
  }
};
