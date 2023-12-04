const db = require("../models");
const Users = db.users; // Cambia "user" a "users"
const Op = db.Sequelize.Op;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { correo_electronico, contrasena } = req.body; // Cambia "email" a "correo_electronico" y "password_hash" a "contrasena"
    const user = await Users.findOne({ where: { correo_electronico: correo_electronico } });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const passwordMatch = await bcrypt.compare(contrasena, user.contrasena); // Cambia "password_hash" a "contrasena"
    if (!passwordMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET);
    res.status(200).json({ message: "Sesión iniciada", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

const moment = require('moment');
// Obtener la fecha actual en formato UTC
const currentDate = new Date().toISOString();

// Formatear la fecha en el formato que requiere MariaDB
const formattedDate = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');

exports.register = async (req, res) => {
  const {
    nombre,
    correo_electronico,
    contrasena,
    apellido_paterno,
    apellido_materno,
  } = req.body;

  try {
    const user = await Users.create({
      nombre: nombre,
      correo_electronico: correo_electronico,
      contrasena: bcrypt.hashSync(contrasena, 8),
      fecha_creacion: formattedDate,
      usuario_creacion: req.user_id, // Agrega el usuario de creación si es necesario
      fecha_actualizacion: formattedDate,
      usuario_actualizacion: req.user_id, // Agrega el usuario de actualización si es necesario
      activo: true, // Puedes establecer esto en true por defecto
      apellido_paterno: apellido_paterno, // Asegúrate de tener estos campos en tu solicitud
      apellido_materno: apellido_materno,
    });

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 86400 // expira en 24 horas
    });

    res.status(201).send({ auth: true, token });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error al registrar usuario" });
  }
};

