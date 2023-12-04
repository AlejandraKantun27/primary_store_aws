module.exports = (sequelize, Sequelize) => {
    const PurchaseDetail = sequelize.define("purchase_detail", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_compra: {
        type: Sequelize.INTEGER
      },
      producto_id: {
        type: Sequelize.INTEGER
      },
      orden: {
        type: Sequelize.INTEGER
      },
      usuario_creacion: {
        type: Sequelize.INTEGER
      },
      fecha_actualizacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    }, {
      timestamps: false
    });
  
    return PurchaseDetail;
  };