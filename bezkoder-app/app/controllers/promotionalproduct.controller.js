const db = require("../models");
const PromotionalProduct = db.promotionalproduct;
const Op = db.Sequelize.Op;

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
