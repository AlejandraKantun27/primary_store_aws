const db = require("../models");
const Purchase = db.purchase;
const PurchaseDetail = db.purchase_detail;
const Op = db.Sequelize.Op;

exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.findAll({
      include: [{ model: PurchaseDetail, as: "purchaseDetails" }],
    });
    res.status(200).json(purchases);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener la lista de compras" });
  }
};

exports.getPurchaseById = async (req, res) => {
  const purchaseId = req.params.id;
  try {
    const purchase = await Purchase.findByPk(purchaseId, {
      include: [{ model: PurchaseDetail, as: "purchaseDetails" }],
    });
    if (!purchase) {
      return res.status(404).json({ message: "Compra no encontrada" });
    }
    res.status(200).json(purchase);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener información de la compra" });
  }
};

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
