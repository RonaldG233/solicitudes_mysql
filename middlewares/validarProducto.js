export function validarProducto(req, res, next) {
    const { nombre, descripcion, precio, categoria_id } = req.body;
  
    // Validación básica
    if (!nombre || !descripcion || precio == null || !categoria_id) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios: nombre, descripcion, precio, categoria_id",
      });
    }
  
    if (typeof nombre !== "string" || typeof descripcion !== "string") {
      return res.status(400).json({
        error: "El nombre y la descripción deben ser cadenas de texto",
      });
    }
  
    if (isNaN(precio) || precio < 0) {
      return res.status(400).json({
        error: "El precio debe ser un número positivo",
      });
    }
  
    if (isNaN(categoria_id) || categoria_id <= 0) {
      return res.status(400).json({
        error: "La categoría debe ser un número válido",
      });
    }
  
    next();
  }
  