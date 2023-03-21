import { Request } from 'express';

export interface IRequestWithUser extends Request {
  user?: Record<string, any>;
}