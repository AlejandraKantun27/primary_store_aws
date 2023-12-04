const db = require("../models");
const Product = db.product;
const Op = db.Sequelize.Op;

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
      campo_adicional_1: req.body.campo_adicional_1,
      campo_adicional_2: req.body.campo_adicional_2,
    });
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el producto" });
  }
};

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
