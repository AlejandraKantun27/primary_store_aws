/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operaciones relacionadas con usuarios
 *   security:
 *     - bearerAuth: []
 */

const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del usuario
 *         nombre:
 *           type: string
 *           description: Nombre del usuario
 *         correo_electronico:
 *           type: string
 *           description: Correo electrónico del usuario
 *         contrasena:
 *           type: string
 *           description: Contraseña del usuario
 *         fecha_creacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del usuario
 *         usuario_creacion:
 *           type: integer
 *           description: ID del usuario que creó al usuario
 *         fecha_actualizacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de actualización del usuario
 *         usuario_actualizacion:
 *           type: integer
 *           description: ID del usuario que actualizó al usuario
 *         activo:
 *           type: boolean
 *           description: Indica si el usuario está activo o no
 *         campo_adicional_1:
 *           type: string
 *           description: Campo adicional 1 del usuario
 *         campo_adicional_2:
 *           type: string
 *           description: Campo adicional 2 del usuario
 */

/**
 * @swagger
 * /api/users/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error del servidor al obtener la lista de usuarios
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener la lista de usuarios" });
  }
};

/**
 * @swagger
 * /api/users/users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario obtenido con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor al obtener información del usuario
 */
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

/**
 * @swagger
 * /api/users/user:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos del usuario a crear
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo_electronico:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               apellido_paterno:
 *                 type: string
 *               apellido_materno:
 *                 type: string
 *               campo_adicional_1:
 *                 type: string
 *               campo_adicional_2:
 *                 type: string
 *             example:
 *               nombre: Nuevo Nombre
 *               correo_electronico: nuevo@correo.com
 *               contrasena: nuevacontrasena
 *               apellido_paterno: Nuevo Apellido Paterno
 *               apellido_materno: Nuevo Apellido Materno 
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       500:
 *         description: Error del servidor al crear el usuario
 */
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
      apellido_paterno: req.body.apellido_paterno,
      apellido_materno: req.body.apellido_materno,      
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};


/**
 * @swagger
 * /api/users/user/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Nuevos datos del usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo_electronico:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               campo_adicional_1:
 *                 type: string
 *               campo_adicional_2:
 *                 type: string
 *             example:
 *               nombre: Nuevo Nombre
 *               correo_electronico: nuevo@correo.com
 *               contrasena: nuevacontrasena
 *               campo_adicional_1: valor1
 *               campo_adicional_2: valor2
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor al actualizar el usuario
 */
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

/**
 * @swagger
 * /api/users/user/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor al eliminar el usuario
 */
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