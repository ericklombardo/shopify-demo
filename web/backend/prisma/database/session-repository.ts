import { exec } from "./client";
import { Session } from "../types";
import { Session as ShopifySession } from "@shopify/shopify-api";
import { SessionStorage } from "@shopify/shopify-app-session-storage/build/ts/types";
export const SessionRepository: SessionStorage = {
  async storeSession(session: ShopifySession): Promise<boolean> {
    console.log("storeCallback called with session:", session);

    await exec<Session>((prisma) =>
      prisma.session.upsert({
        where: {
          id: session.id,
        },
        update: {
          id: session.id,
          session: JSON.stringify(session.toPropertyArray()),
          shop: session.shop,
        },
        create: {
          id: session.id,
          session: JSON.stringify(session.toPropertyArray()),
          shop: session.shop,
        },
      })
    );

    return true;
  },

  async loadSession(id: string): Promise<ShopifySession | undefined> {
    console.log("loadCallback called with id:", id);

    const response = await exec<Session | null>((prisma) =>
      prisma.session.findUnique({
        where: {
          id,
        },
      })
    );

    if (!response) {
      return undefined;
    }

    const session = JSON.parse(response.session);
    return ShopifySession.fromPropertyArray(session);
  },

  async findSessionsByShop(shop: string): Promise<ShopifySession[]> {
    console.log("findSessions called with shop:", shop);

    const response = await exec<Session[]>((prisma) =>
      prisma.session.findMany({
        where: {
          shop,
        },
      })
    );

    if (!response) {
      return [];
    }

    return response.map((d) =>
      ShopifySession.fromPropertyArray(JSON.parse(d.session))
    );
  },

  async deleteSession(shop: string): Promise<boolean> {
    console.log("deleteSession called with shop:", shop);

    await exec((prisma) =>
      prisma.session.deleteMany({
        where: {
          shop,
        },
      })
    );
    return true;
  },

  async deleteSessions(ids: string[]): Promise<boolean> {
    console.log("deleteSessions called with ids:", ids);

    await exec((prisma) =>
      prisma.session.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      })
    );
    return true;
  },
};
