import { Router } from 'express';
import CotizacionController from '../controllers/cotizacionController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Cotizaciones
 *   description: Endpoints para la gestión de cotizaciones.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cotizacion:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Identificador de la cotización.
 *         cliente:
 *           type: string
 *           description: Nombre del cliente.
 *         fecha:
 *           type: string
 *           format: date-time
 *           description: Fecha de la cotización.
 *         total:
 *           type: number
 *           description: Total de la cotización.
 *       required:
 *         - cliente
 *         - fecha
 *         - total
 * 
 *     NewCotizacion:
 *       type: object
 *       properties:
 *         cliente:
 *           type: string
 *           description: Nombre del cliente.
 *         fecha:
 *           type: string
 *           format: date-time
 *           description: Fecha de la cotización.
 *         total:
 *           type: number
 *           description: Total de la cotización.
 *       required:
 *         - cliente
 *         - fecha
 *         - total
 */

/**
 * @swagger
 * /cotizaciones:
 *   get:
 *     summary: Obtiene todas las cotizaciones.
 *     tags: [Cotizaciones]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cotizacion'
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', CotizacionController.getCotizaciones);

/**
 * @swagger
 * /cotizaciones:
 *   post:
 *     summary: Crea una nueva cotización.
 *     tags: [Cotizaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCotizacion'
 *     responses:
 *       201:
 *         description: Cotización creada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cotizacion'
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/', CotizacionController.createCotizacion);

export default router;
