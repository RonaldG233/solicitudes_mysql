import Categoria from "../models/Categoria.js";
import connection from "../utils/db.js"; // Necesario para verificar productos



class CategoriaController {
    static getAllCategorias = async (req, res) => {
      try {
        const OBJCategoria = new Categoria();
        const categorias = await OBJCategoria.getAll();
        res.json(categorias);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  
    static createCategoria = async (req, res) => {
      try {
        const { nombre, descripcion } = req.body;
        const OBJCategoria = new Categoria();
        const categoria = await OBJCategoria.create(nombre, descripcion);
        res.status(201).json(categoria); 
      } catch (error) {
        res.status(500).json({ error: error.message }); 
      }
    };
  
    static actualizarCategoria = async (req, res) => {
      try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        const OBJCategoria = new Categoria();
        const categoria = await OBJCategoria.update(nombre, descripcion, id);
        res.json(categoria);
      } catch (error) {
        res.status(500).json({ error: error.message }); 
      }
    };
  
    static actualizarParcialCategoria = async (req, res) => {
        const campos = req.body;
        const { id } = req.params;
      
        if (Object.keys(campos).length === 0) {
          return res.status(400).json({ error: "Se debe enviar al menos un campo" });
        }
      
        try {
          const OBJCategoria = new Categoria();
          const categoria = await OBJCategoria.patch(id, campos);
          res.json(categoria);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    }

    static eliminarCategoria = async (req, res) => {
      const { id } = req.params;
      try {
        // Verificar si hay productos asociados a la categoria
        const [productos] = await connection.query(
          "SELECT COUNT(*) AS cantidad FROM productos WHERE categoria_id = ?",
          [id]
        );
  
        if (productos[0].cantidad > 0) {
          return res.status(400).json({
            error: "No se puede eliminar la categoría porque tiene productos asociados."
          });
        }
  
        // Si no hay productos asociados, eliminar categoria
        const OBJCategoria = new Categoria();
        const resultado = await OBJCategoria.delete(id);
  
        res.json(resultado);
  
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
    
      
  }
  
  export default CategoriaController;