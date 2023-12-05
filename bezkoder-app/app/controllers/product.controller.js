/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operaciones relacionadas con productos
 *   security:
 *     - bearerAuth: []
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del producto
 *         nombre:
 *           type: string
 *           description: Nombre del producto
 *         descripcion:
 *           type: string
 *           description: Descripción del producto
 *         precio:
 *           type: number
 *           description: Precio del producto
 *         categoria:
 *           type: string
 *           description: Categoría del producto
 *         fabricante:
 *           type: string
 *           description: Fabricante del producto
 *         cantidad_en_existencia:
 *           type: integer
 *           description: Cantidad en existencia del producto
 *         unidad_de_medida:
 *           type: string
 *           description: Unidad de medida del producto
 *         fecha_creacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del producto
 *         usuario_creacion:
 *           type: integer
 *           description: ID del usuario que creó el producto
 *         fecha_actualizacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de actualización del producto
 *         usuario_actualizacion:
 *           type: integer
 *           description: ID del usuario que actualizó el producto
 *         activo:
 *           type: boolean
 *           description: Indica si el producto está activo o no
 */

const db = require("../models");
const Product = db.product;
const Op = db.Sequelize.Op;

/**
 * @swagger
 * /api/products/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error del servidor al obtener la lista de productos
 */
exports.getAllProducts = async (req, res) => {
  try {
    // Puedes utilizar query parameters para filtrar los productos, si es necesario
    const { queryparam1, queryparam2 } = req.query;
    const whereClause = {}; // Define tus condiciones de filtrado aquí

    const products = await Product.findAll({ where: whereClause });
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener la lista de productos" });
  }
};

/**
 * @swagger
 * /api/products/products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto obtenido con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor al obtener información del producto
 */
exports.getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener información del producto" });
  }
};

/**
 * @swagger
 * /api/products/product:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos del producto a crear
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error del servidor al crear el producto
 */
exports.createProduct = async (req, res) => {
  const {
    nombre,
    descripcion,
    precio,
    categoria,
    fabricante,
    cantidad_en_existencia,
    unidad_de_medida,
    usuario_creacion
  } = req.body;
  try {
    const product = await Product.create({
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      categoria: categoria,
      fabricante: fabricante,
      cantidad_en_existencia: cantidad_en_existencia,
      unidad_de_medida: unidad_de_medida,
      fecha_creacion: new Date(),
      usuario_creacion: usuario_creacion,
      fecha_actualizacion: new Date(),
      usuario_actualizacion: usuario_creacion,
      activo: true,
      numero_serie: req.body.numero_serie,
      marca: req.body.marca,
    });
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el producto" });
  }
};

/**
 * @swagger
 * /api/products/product/{id}:
 *   put:
 *     summary: Actualizar un producto por ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Nuevos datos del producto
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor al actualizar el producto
 */
exports.updateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: productId },
    });
    if (updated) {
      const updatedProduct = await Product.findByPk(productId);
      return res.status(200).json({
        message: "Producto actualizado",
        data: updatedProduct,
      });
    }
    throw new Error("Producto no encontrado");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

/**
 * @swagger
 * /api/products/product/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado con éxito
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor al eliminar el producto
 */
exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const deleted = await Product.destroy({
      where: { id: productId },
    });
    if (deleted) {
      return res.status(200).json({ message: "Producto eliminado" });
    }
    throw new Error("Producto no encontrado");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};
