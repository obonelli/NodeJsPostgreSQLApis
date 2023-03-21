import { Request, Response } from 'express';
import Message from '../models/messageModel';

class MessageController {
  async getMessages(req: Request, res: Response) {
    try {
      const messages = await Message.findAll();
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los mensajes', error });
    }
  }

  async getMessageById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const message = await Message.findByPk(id);

      if (message) {
        res.status(200).json(message);
      } else {
        res.status(404).json({ message: 'Mensaje no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el mensaje', error });
    }
  }

  async createMessage(req: Request, res: Response) {
    try {
      const { content, timestamp } = req.body;
      const newMessage = await Message.create({ content, timestamp });
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el mensaje', error });
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
        res.status(404).json({ message: 'Mensaje no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el mensaje', error });
    }
  }

  async deleteMessage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const message = await Message.findByPk(id);

      if (message) {
        await message.destroy();
        res.status(200).json({ message: 'Mensaje eliminado' });
      } else {
        res.status(404).json({ message: 'Mensaje no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el mensaje', error });
    }
  }
}

export default new MessageController();