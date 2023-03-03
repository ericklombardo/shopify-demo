import { exec } from "./client";

export const createMessage = (message: string) => {
  return exec((prisma) =>
    prisma.message.create({
      data: {
        description: message,
      },
    })
  );
};
