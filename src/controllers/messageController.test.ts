import { Request, Response } from "express";
import Message from "../models/messageModel";
import MessageController from "./messageController";

jest.mock("../models/messageModel");

describe("MessageController", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getMessages", () => {
    it("should return a list of messages", async () => {
      const messages = [
        {
          id: 1,
          content: "Test message 1",
          timestamp: "2023-03-21T00:00:00.000Z",
        },
        {
          id: 2,
          content: "Test message 2",
          timestamp: "2023-03-21T00:00:00.000Z",
        },
      ];

      (Message.findAll as jest.Mock).mockResolvedValue(messages);

      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await MessageController.getMessages(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(messages);
    });

    // Agrega más casos de prueba para diferentes escenarios
  });
  describe("getMessageById", () => {
    it("should return a message when a valid ID is provided", async () => {
      const message = {
        id: 1,
        content: "Test message 1",
        timestamp: "2023-03-21T00:00:00.000Z",
      };

      (Message.findByPk as jest.Mock).mockResolvedValue(message);

      const req = {
        params: { id: "1" },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await MessageController.getMessageById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(message);
    });

    it("should return a 404 status when the message is not found", async () => {
      (Message.findByPk as jest.Mock).mockResolvedValue(null);

      const req = {
        params: { id: "999" },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await MessageController.getMessageById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Message not found" });
    });

    // Agrega más casos de prueba para diferentes escenarios, si es necesario
  });

  describe("createMessage", () => {
    it("should create a message and return it with a 201 status", async () => {
      const newMessageData = {
        content: "Test message 1",
        timestamp: "2023-03-21T00:00:00.000Z",
      };

      const createdMessage = {
        id: 1,
        ...newMessageData,
      };

      (Message.create as jest.Mock).mockResolvedValue(createdMessage);

      const req = {
        body: newMessageData,
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await MessageController.createMessage(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdMessage);
    });

    // Agrega más casos de prueba para diferentes escenarios, si es necesario
  });

  describe("updateMessage", () => {
    it("should update a message when a valid ID is provided", async () => {
      const messageData = {
        id: 1,
        content: "Test message 1",
        timestamp: "2023-03-21T00:00:00.000Z",
      };
      const updatedMessageData = {
        content: "Updated test message 1",
        timestamp: "2023-03-22T00:00:00.000Z",
      };
      const updatedMessage = {
        id: 1,
        ...updatedMessageData,
      };

      (Message.findByPk as jest.Mock).mockResolvedValue({
        ...messageData,
        update: jest.fn().mockImplementation(async function (this: any) {
          Object.assign(this, updatedMessageData);
          return this;
        }),
      });

      const req = {
        params: { id: "1" },
        body: updatedMessageData,
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await MessageController.updateMessage(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining(updatedMessage)
      );
    });

    // ...otros casos de prueba
  });

  describe("deleteMessage", () => {
    it("should delete a message and return a success message with a 200 status", async () => {
      const messageData = {
        id: 1,
        content: "Test message 1",
        timestamp: "2023-03-21T00:00:00.000Z",
      };

      (Message.findByPk as jest.Mock).mockResolvedValue({
        ...messageData,
        destroy: jest.fn().mockResolvedValue(undefined),
      });

      const req = {
        params: { id: "1" },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await MessageController.deleteMessage(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Message deleted" });
    });

    it("should return a 404 status when the message is not found", async () => {
      (Message.findByPk as jest.Mock).mockResolvedValue(null);

      const req = {
        params: { id: "999" },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await MessageController.deleteMessage(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Message not found" });
    });

    // Agrega más casos de prueba para diferentes escenarios, si es necesario
  });

  // Continúa escribiendo pruebas para los otros métodos del controlador
});
