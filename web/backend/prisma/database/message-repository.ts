import { exec } from "./client";
import { Message } from "../types";

export const MessageRepository = {
  create(message: string, shop: string): Promise<Message | undefined> {
    return exec<Message>((prisma) =>
      prisma.message.create({
        data: {
          description: message,
          shop,
        },
      })
    );
  },
  update(id: number, message: string): Promise<Message | undefined> {
    return exec<Message>((prisma) =>
      prisma.message.update({
        where: { id },
        data: {
          description: message,
        },
      })
    );
  },
  delete(id: number): Promise<Message | undefined> {
    return exec<Message>((prisma) => prisma.message.delete({ where: { id } }));
  },
  getById(id: number): Promise<Message | null | undefined> {
    return exec<Message | null>((prisma) =>
      prisma.message.findUnique({ where: { id } })
    );
  },
  getAll(shop: string): Promise<Message[] | undefined> {
    return exec<Message[]>((prisma) =>
      prisma.message.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          shop,
        },
      })
    );
  },
  getLatestMessage(shop: string): Promise<Message | null | undefined> {
    return exec<Message | null>((prisma) =>
      prisma.message.findFirst({
        where: { shop },
        orderBy: {
          createdAt: "desc",
        },
      })
    );
  },
};
