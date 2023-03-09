import express from "express";
import { MessageRepository } from "../prisma/database";

export const applyPublicApiEndpoints = (app: express.Express) => {
  app.get("/api/messages/latest", async (_req, res) => {
    const message = await MessageRepository.getLatestMessage(
      _req.query.shop as string
    );
    res.jsonp({ message: message?.description ?? "" });
  });
};

export const applyMessagesApiEndpoints = (app: express.Express) => {
  app.get("/api/messages/:id", async (req, res) => {
    const { id } = req.params;
    const message = await MessageRepository.getById(parseInt(id, 10));
    res.status(200).send(message);
  });

  app.get("/api/messages", async (req, res) => {
    const shop = res.locals.shopify.session.shop as string;
    const messages = await MessageRepository.getAll(shop);
    res.status(200).send(messages);
  });

  app.post("/api/messages", async (req, res) => {
    const { message } = req.body;
    const shop = res.locals.shopify.session.shop as string;
    const newMessage = await MessageRepository.create(
      message.description,
      shop
    );
    res.status(200).send(newMessage);
  });

  app.patch("/api/messages/:id", async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
    const updatedMessage = await MessageRepository.update(
      parseInt(id, 10),
      message.description
    );
    res.status(200).send(updatedMessage);
  });

  app.delete("/api/messages", async (req, res) => {
    const { ids } = req.body;
    const deletedCount = await MessageRepository.deleteByIds(ids);
    res.status(200).send({ deletedCount });
  });
};
