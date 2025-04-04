
import Producto from "../models/Producto.js";

class ProductoController {
  static getAllProductos = async (req, res) => {
    try {
      const OBJProducto = new Producto();
      const productos = await OBJProducto.getAll();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message }); 
    }
  };

  static createProducto = async (req, res) => {
    try {
      const { nombre, descripcion, precio, categoria_id } = req.body;
      const OBJProducto = new Producto(nombre, descripcion, precio, categoria_id);
      const producto = await OBJProducto.create();
      res.status(201).json(producto);
    } catch (error) {
      res.status(500).json({ error: error.message }); 
    }
  };
  static actualizarProducto = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion, precio, categoria_id } = req.body;
      const OBJProducto = new Producto();
      const producto = await OBJProducto.update(nombre, descripcion, precio, categoria_id, id);
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static actualizarParcialProducto = async (req, res) => {
    try {
      const { id } = req.params;
      const campos = req.body;
      const OBJProducto = new Producto();
      const producto = await OBJProducto.patch(id, campos);
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  static deleteProducto = async (req, res) => {
    const { id } = req.params;
    try {
      const producto = new Producto(); 
      const resultado = await producto.delete(id);
      res.json(resultado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
}
export default ProductoController;