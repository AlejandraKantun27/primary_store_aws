module.exports = (sequelize, Sequelize) => {
    const PromotionalProduct = sequelize.define("promotionalproduct", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descripcion: {
        type: Sequelize.TEXT
      },
      precio_en_promocion: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      fecha_inicio_promocion: {
        type: Sequelize.DATE
      },
      fecha_finalizacion_promocion: {
        type: Sequelize.DATE
      },
      activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      numero_serie: {
        type: Sequelize.STRING
      },
      marca: {
        type: Sequelize.STRING
      }
    }, {
      timestamps: false
    });
  
    return PromotionalProduct;
  };
  