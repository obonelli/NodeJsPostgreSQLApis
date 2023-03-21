import { Request, Response } from 'express';
import User from '../models/usersModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return res.status(400).json({ message: 'Incorrect username or password' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Incorrect username or password' });
      }

      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET!, { expiresIn: '1h' });

      res.status(200).json({ token });
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
      } else {
        res.status(500).json({ message: 'Error fetching user', error: 'Unknown error' });
      }
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, password: hashedPassword });
      res.status(201).json(newUser);
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
      } else {
        res.status(500).json({ message: 'Error creating user', error: 'Unknown error' });
      }
    }
  }
}

export default AuthController;