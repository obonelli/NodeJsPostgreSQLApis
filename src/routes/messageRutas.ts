import { Router } from 'express';
import MessageController from '../controllers/messageController';

const router = Router();

router.get('/', MessageController.getMessages);
router.get('/:id', MessageController.getMessageById);
router.post('/', MessageController.createMessage);
router.put('/:id', MessageController.updateMessage);
router.delete('/:id', MessageController.deleteMessage);

export default router;
