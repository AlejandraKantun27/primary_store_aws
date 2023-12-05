/**
 * @swagger
 * tags:
 *   name: PromotionalProducts
 *   description: Operaciones relacionadas con productos en promoción
 *   security:
 *     - bearerAuth: []
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PromotionalProduct:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del producto en promoción
 *         nombre:
 *           type: string
 *           description: Nombre del producto en promoción
 *         descripcion:
 *           type: string
 *           description: Descripción del producto en promoción
 *         precio_en_promocion:
 *           type: number
 *           description: Precio en promoción del producto
 *         fecha_inicio_promocion:
 *           type: string
 *           format: date-time
 *           description: Fecha de inicio de la promoción del producto
 *         fecha_finalizacion_promocion:
 *           type: string
 *           format: date-time
 *           description: Fecha de finalización de la promoción del producto
 *         activo:
 *           type: boolean
 *           description: Indica si el producto en promoción está activo o no
 */

const db = require("../models");
const PromotionalProduct = db.promotionalproduct;
const Op = db.Sequelize.Op;

/**
 * @swagger
 * /api/promotionalproducts/promotionalproducts:
 *   get:
 *     summary: Obtener todos los productos en promoción
 *     tags: [PromotionalProducts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos en promoción obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PromotionalProduct'
 *       500:
 *         description: Error del servidor al obtener la lista de productos en promoción
 */
exports.getAllPromotionalProducts = async (req, res) => {
  try {
    // Puedes utilizar query parameters para filtrar los productos en promoción, si es necesario
    const { queryparam1, queryparam2 } = req.query;
    const whereClause = {}; // Define tus condiciones de filtrado aquí

    const promotionalProducts = await PromotionalProduct.findAll({ where: whereClause });
    res.status(200).json(promotionalProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener la lista de productos en promoción" });
  }
};

/**
 * @swagger
 * /api/promotionalproducts/promotionalproducts/{id}:
 *   get:
 *     summary: Obtener un producto en promoción por ID
 *     tags: [PromotionalProducts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto en promoción a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto en promoción obtenido con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PromotionalProduct'
 *       404:
 *         description: Producto en promoción no encontrado
 *       500:
 *         description: Error del servidor al obtener información del producto en promoción
 */
exports.getPromotionalProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const promotionalProduct = await PromotionalProduct.findByPk(productId);
    if (!promotionalProduct) {
      return res.status(404).json({ message: "Producto en promoción no encontrado" });
    }
    res.status(200).json(promotionalProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener información del producto en promoción" });
  }
};

/**
 * @swagger
 * /api/promotionalproducts/promotionalproduct:
 *   post:
 *     summary: Crear un nuevo producto en promoción
 *     tags: [PromotionalProducts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos del producto en promoción a crear
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PromotionalProduct'
 *     responses:
 *       201:
 *         description: Producto en promoción creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PromotionalProduct'
 *       500:
 *         description: Error del servidor al registrar el producto en promoción
 */
exports.createPromotionalProduct = async (req, res) => {
  const {
    nombre,
    descripcion,
    precio_en_promocion,
    fecha_inicio_promocion,
    fecha_finalizacion_promocion,
    usuario_creacion
  } = req.body;
  try {
    const promotionalProduct = await PromotionalProduct.create({
      nombre: nombre,
      descripcion: descripcion,
      precio_en_promocion: precio_en_promocion,
      fecha_inicio_promocion: fecha_inicio_promocion,
      fecha_finalizacion_promocion: fecha_finalizacion_promocion,
      activo: true,
      numero_serie: req.body.numero_serie,
      marca: req.body.marca,
    });
    res.status(201).json(promotionalProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al registrar el producto en promoción" });
  }
};

/**
 * @swagger
 * /api/promotionalproducts/promotionalproduct/{id}:
 *   put:
 *     summary: Actualizar un producto en promoción por ID
 *     tags: [PromotionalProducts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto en promoción a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Nuevos datos del producto en promoción
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PromotionalProduct'
 *     responses:
 *       200:
 *         description: Producto en promoción actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PromotionalProduct'
 *       404:
 *         description: Producto en promoción no encontrado
 *       500:
 *         description: Error del servidor al actualizar el producto en promoción
 */
exports.updatePromotionalProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const [updated] = await PromotionalProduct.update(req.body, {
      where: { id: productId },
    });
    if (updated) {
      const updatedPromotionalProduct = await PromotionalProduct.findByPk(productId);
      return res.status(200).json({
        message: "Producto en promoción actualizado",
        data: updatedPromotionalProduct,
      });
    }
    throw new Error("Producto en promoción no encontrado");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al actualizar el producto en promoción" });
  }
};

/**
 * @swagger
 * /api/promotionalproducts/promotionalproduct/{id}:
 *   delete:
 *     summary: Eliminar un producto en promoción por ID
 *     tags: [PromotionalProducts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto en promoción a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto en promoción eliminado con éxito
 *       404:
 *         description: Producto en promoción no encontrado
 *       500:
 *         description: Error del servidor al eliminar el producto en promoción
 */
exports.deletePromotionalProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const deleted = await PromotionalProduct.destroy({
      where: { id: productId },
    });
    if (deleted) {
      return res.status(200).json({ message: "Producto en promoción eliminado" });
    }
    throw Error("Producto en promoción no encontrado");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al eliminar el producto en promoción" });
  }
};
