import { Request, Response } from 'express';
import Message from '../models/messageModel';

class MessageController {
  async getMessages(req: Request, res: Response) {
    try {
      const messages = await Message.findAll();
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: 'Error while getting messages', error });
    }
  }

  async getMessageById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const message = await Message.findByPk(id);

      if (message) {
        res.status(200).json(message);
      } else {
        res.status(404).json({ message: 'Message not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error while getting message', error });
    }
  }

  async createMessage(req: Request, res: Response) {
    try {
      const { content, timestamp } = req.body;
      const newMessage = await Message.create({ content, timestamp });
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ message: 'Error while creating message', error });
    }
  }

  async updateMessage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { content, timestamp } = req.body;

      const message = await Message.findByPk(id);

      if (message) {
        await message.update({ content, timestamp });
        res.status(200).json(message);
      } else {
        res.status(404).json({ message: 'Message not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error while updating message', error });
    }
  }

  async deleteMessage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const message = await Message.findByPk(id);

      if (message) {
        await message.destroy();
        res.status(200).json({ message: 'Message deleted' });
      } else {
        res.status(404).json({ message: 'Message not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error while deleting message', error });
    }
  }
}

export default new MessageController();