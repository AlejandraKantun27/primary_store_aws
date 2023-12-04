module.exports = (app) => {
    const promotionalProductsController = require("../controllers/promotionalproduct.controller");
    const promotionalProductsRouter = require("express").Router();
    const auth = require("../middlewares/auth");
  
    promotionalProductsRouter.get("/promotionalproducts", auth.requireAuth, promotionalProductsController.getAllPromotionalProducts);
    promotionalProductsRouter.get("/promotionalproducts/:id", auth.requireAuth, promotionalProductsController.getPromotionalProductById);
    promotionalProductsRouter.post("/promotionalproduct", auth.requireAuth, promotionalProductsController.createPromotionalProduct);
    promotionalProductsRouter.put("/promotionalproduct/:id", auth.requireAuth, promotionalProductsController.updatePromotionalProduct);
    promotionalProductsRouter.delete("/promotionalproduct/:id", auth.requireAuth, promotionalProductsController.deletePromotionalProduct);
  
    app.use("/api/promotionalproducts", promotionalProductsRouter);
  };
  