module.exports = (app) => {
    const productsController = require("../controllers/product.controller");
    const productsRouter = require("express").Router();
    const auth = require("../middlewares/auth");
  
    productsRouter.get("/products", auth.requireAuth, productsController.getAllProducts);
    productsRouter.get("/products/:id", auth.requireAuth, productsController.getProductById);
    productsRouter.post("/product", auth.requireAuth, productsController.createProduct);
    productsRouter.put("/product/:id", auth.requireAuth, productsController.updateProduct);
    productsRouter.delete("/product/:id", auth.requireAuth, productsController.deleteProduct);
  
    app.use("/api/products", productsRouter);
  };
  