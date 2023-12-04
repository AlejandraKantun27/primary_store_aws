const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener la lista de usuarios" });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener información del usuario" });
  }
};

exports.createUser = async (req, res) => {
  const { nombre, correo_electronico, contrasena, usuario_creacion } = req.body;
  try {
    const user = await Users.create({
      nombre: nombre,
      correo_electronico: correo_electronico,
      contrasena: contrasena,
      fecha_creacion: new Date(),
      usuario_creacion: usuario_creacion,
      fecha_actualizacion: new Date(),
      usuario_actualizacion: usuario_creacion,
      activo: true,
      campo_adicional_1: req.body.campo_adicional_1,
      campo_adicional_2: req.body.campo_adicional_2,
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const [updated] = await Users.update(req.body, {
      where: { id: userId },
    });
    if (updated) {
      const updatedUser = await Users.findByPk(userId);
      return res.status(200).json({
        message: "Usuario actualizado",
        data: updatedUser,
      });
    }
    throw new Error("Usuario no encontrado");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deleted = await Users.destroy({
      where: { id: userId },
    });
    if (deleted) {
      return res.status(200).json({ message: "Usuario eliminado" });
    }
    throw new Error("Usuario no encontrado");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};
