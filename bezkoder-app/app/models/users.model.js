module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      correo_electronico: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contrasena: {
        type: Sequelize.STRING,
        allowNull: false
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
      apellido_paterno: {
        type: Sequelize.STRING,
        allowNull: false
      },
      apellido_materno: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }, {
      timestamps: false
    });
  
    return User;
  };
  