/**
 * @swagger
 * tags:
 *   name: Purchases
 *   description: Operaciones relacionadas con compras
 *   security:
 *     - bearerAuth: []
 */

const db = require("../models");
const Purchase = db.purchase;
const PurchaseDetail = db.purchase_detail;
const Op = db.Sequelize.Op;

/**
 * @swagger
 * components:
 *   schemas:
 *     Purchase:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la compra
 *         descripcion:
 *           type: string
 *           description: Descripción de la compra
 *         nombre_cliente:
 *           type: string
 *           description: Nombre del cliente
 *         precio_total:
 *           type: number
 *           description: Precio total de la compra
 *         total_productos:
 *           type: integer
 *           description: Total de productos en la compra
 *         fecha_creacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la compra
 *         usuario_creacion:
 *           type: integer
 *           description: ID del usuario que creó la compra
 *         fecha_actualizacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de actualización de la compra
 *         usuario_actualizacion:
 *           type: integer
 *           description: ID del usuario que actualizó la compra
 *         activo:
 *           type: boolean
 *           description: Indica si la compra está activa o no
 *         purchaseDetails:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PurchaseDetail'
 *
 *     PurchaseDetail:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del detalle de la compra
 *         compra_id:
 *           type: integer
 *           description: ID de la compra a la que pertenece el detalle
 *         producto:
 *           type: string
 *           description: Producto del detalle de la compra
 *         orden:
 *           type: integer
 *           description: Orden del detalle en la compra
 *         usuario_creacion:
 *           type: integer
 *           description: ID del usuario que creó el detalle de la compra
 *         fecha_actualizacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de actualización del detalle de la compra
 */

/**
 * @swagger
 * /api/purchases/purchases:
 *   get:
 *     summary: Obtener todas las compras
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de compras obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Purchase'
 *       500:
 *         description: Error del servidor al obtener la lista de compras
 */
exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.findAll();
    res.status(200).json(purchases);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener la lista de compras" });
  }
};

/**
 * @swagger
 * /api/purchases/purchases/{id}:
 *   get:
 *     summary: Obtener una compra por ID
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la compra a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Compra obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Purchase'
 *       404:
 *         description: Compra no encontrada
 *       500:
 *         description: Error del servidor al obtener información de la compra
 */
exports.getPurchaseById = async (req, res) => {
  const purchaseId = req.params.id;
  try {
    const purchase = await Purchase.findByPk(purchaseId);
    if (!purchase) {
      return res.status(404).json({ message: "Compra no encontrada" });
    }
    res.status(200).json(purchase);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener información de la compra" });
  }
};

/**
 * @swagger
 * /api/purchases/purchases:
 *   post:
 *     summary: Crear una nueva compra
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos de la compra a crear
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Purchase'
 *     responses:
 *       201:
 *         description: Compra creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Purchase'
 *       500:
 *         description: Error del servidor al crear la compra
 */
exports.createPurchase = async (req, res) => {
  const {
    descripcion,
    nombre_cliente,
    precio_total,
    total_productos,
    usuario_creacion,
  } = req.body;
  try {
    const purchase = await Purchase.create({
      descripcion: descripcion,
      nombre_cliente: nombre_cliente,
      precio_total: precio_total,
      total_productos: total_productos,
      fecha_creacion: new Date(),
      usuario_creacion: usuario_creacion,
      fecha_actualizacion: new Date(),
      usuario_actualizacion: usuario_creacion,
      activo: true,
    });

    const purchaseDetails = req.body.detallado_de_compra;
    if (Array.isArray(purchaseDetails) && purchaseDetails.length > 0) {
      await PurchaseDetail.bulkCreate(purchaseDetails.map((detail) => ({
        compra_id: purchase.id,
        producto: detail.producto,
        orden: detail.orden,
        usuario_creacion: usuario_creacion,
        fecha_actualizacion: new Date(),
      })));
    }

    res.status(201).json(purchase);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear la compra" });
  }
};
