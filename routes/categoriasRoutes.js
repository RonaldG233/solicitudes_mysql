import express from "express";
import CategoriaController from "../controller/CategoriaController.js";
import { validarCategoria } from "../middlewares/validarCategoria.js";
import { validarCategoriaParcial } from "../middlewares/validarCategoriaParcial.js";

const router = express.Router();

// Obtener todas las categorías
router.get("/", CategoriaController.getAllCategorias);

// Crear categoría con validación
router.post("/", validarCategoria, CategoriaController.createCategoria);

// Actualizar completamente una categoría
router.put("/:id", validarCategoria, CategoriaController.actualizarCategoria);

// Actualizar parcialmente una categoría
router.patch("/:id", validarCategoriaParcial ,CategoriaController.actualizarParcialCategoria);

router.delete("/:id", CategoriaController.eliminarCategoria);


export default router;
