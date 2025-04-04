import express from "express";
import ProductoController from "../controller/ProductoController.js";
import { validarProducto } from "../middlewares/validarProducto.js";
import { validarProductoParcial } from "../middlewares/validarProductoParcial.js";

const router = express.Router();

// Obtener todos los productos
router.get("/", ProductoController.getAllProductos);

// Crear producto (agrega validarProducto si lo tienes)
router.post("/",  validarProducto,  ProductoController.createProducto);

// Actualizar completamente un producto
router.put("/:id", validarProducto, ProductoController.actualizarProducto);

// Actualizar parcialmente un producto
router.patch("/:id", validarProductoParcial , ProductoController.actualizarParcialProducto);

router.delete('/:id', ProductoController.deleteProducto);


export default router;
