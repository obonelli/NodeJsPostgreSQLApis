import { Router } from 'express';
import MessageController from '../controllers/messageController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         content:
 *           type: string
 *         timestamp:
 *           type: string
 *           format: date-time
 *     NewMessage:
 *       type: object
 *       properties:
 *         content:
 *           type: string
 *       required:
 *         - content
 */

router.get('/', MessageController.getMessages);

router.use(authMiddleware); // Aplicamos el middleware de autenticación a todas las rutas que siguen.

/**
 * @swagger
 * /api/messages/{id}:
 *   get:
 *     description: Obtiene un mensaje por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
router.get('/:id', MessageController.getMessageById);

/**
 * @swagger
 * /api/messages:
 *   post:
 *     description: Crea un nuevo mensaje
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewMessage'
 *     responses:
 *       201:
 *         description: Mensaje creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
router.post('/', MessageController.createMessage);

/**
 * @swagger
 * /api/messages/{id}:
 *   put:
 *     description: Actualiza un mensaje por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewMessage'
 *     responses:
 *       200:
 *         description: Mensaje actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
router.put('/:id', MessageController.updateMessage);

/**
 * @swagger
 * /api/messages/{id}:
 *   delete:
 *     description: Elimina un mensaje por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mensaje eliminado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
router.delete('/:id', MessageController.deleteMessage);

export default router;