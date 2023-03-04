import express from "express";
import { MessageRepository } from "../prisma/database";

export const applyMessagesApiEndpoints = (app: express.Express) => {
  app.get("/api/messages/:id", async (req, res) => {
    const { id } = req.params;
    const message = await MessageRepository.getById(parseInt(id, 10));
    res.status(200).send(message);
  });

  app.get("/api/messages", async (req, res) => {
    const messages = await MessageRepository.getAll();
    res.status(200).send(messages);
  });

  app.post("/api/messages", async (req, res) => {
    const { message } = req.body;
    const newMessage = await MessageRepository.create(message.description);
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
};
