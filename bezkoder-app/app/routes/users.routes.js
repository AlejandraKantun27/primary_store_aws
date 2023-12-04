module.exports = (app) => {
    const usersController = require("../controllers/users.controller");
  
    const usersRouter = require("express").Router();
    const auth = require("../middlewares/auth");
  
    usersRouter.get("/users", auth.requireAuth, usersController.getAllUsers);
    usersRouter.get("/user/:id", auth.requireAuth, usersController.getUserById);
    usersRouter.post("/user", auth.requireAuth, usersController.createUser);
    usersRouter.put("/user/:id", auth.requireAuth, usersController.updateUser);
    usersRouter.delete("/user/:id", auth.requireAuth, usersController.deleteUser);
  
    app.use("/api/users", usersRouter);
  };
  