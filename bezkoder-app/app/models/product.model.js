module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
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
      precio: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      categoria: {
        type: Sequelize.STRING
      },
      fabricante: {
        type: Sequelize.STRING
      },
      cantidad_en_existencia: {
        type: Sequelize.INTEGER
      },
      unidad_de_medida: {
        type: Sequelize.STRING
      },
      fecha_creacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      usuario_creacion: {
        type: Sequelize.INTEGER
      },
      fecha_actualizacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      usuario_actualizacion: {
        type: Sequelize.INTEGER
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
  
    return Product;
  };
  