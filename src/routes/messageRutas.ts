import { Router } from 'express';
import MessageController from '../controllers/messageController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

// Proteger a solo una ruta
// router.get('/:id', authMiddleware, MessageController.getMessageById);

router.get('/', MessageController.getMessages);
router.use(authMiddleware); // Aplicamos el middleware de autenticación a todas las rutas que siguen.
router.get('/:id', MessageController.getMessageById);
router.post('/', MessageController.createMessage);
router.put('/:id', MessageController.updateMessage);
router.delete('/:id', MessageController.deleteMessage);

export default router;
