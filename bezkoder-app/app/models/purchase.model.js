module.exports = (sequelize, Sequelize) => {
    const Purchase = sequelize.define("purchase", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      descripcion: {
        type: Sequelize.TEXT
      },
      nombre_del_cliente: {
        type: Sequelize.STRING
      },
      precio_total: {
        type: Sequelize.DECIMAL(10, 2)
      },
      total_de_productos: {
        type: Sequelize.INTEGER
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
      }
    }, {
      timestamps: false
    });
  
    return Purchase;
  };
  