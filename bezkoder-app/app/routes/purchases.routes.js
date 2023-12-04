module.exports = (app) => {
    const purchasesController = require("../controllers/purchases.controller");
    const purchasesRouter = require("express").Router();
    const auth = require("../middlewares/auth");
  
    purchasesRouter.get("/purchases", auth.requireAuth, purchasesController.getAllPurchases);
    purchasesRouter.get("/purchases/:id", auth.requireAuth, purchasesController.getPurchaseById);
    purchasesRouter.post("/purchases", auth.requireAuth, purchasesController.createPurchase);
  
    app.use("/api/purchases", purchasesRouter);
  };
  