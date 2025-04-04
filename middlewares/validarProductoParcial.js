export function validarProductoParcial(req, res, next) {
    const campos = req.body;
  
    if (Object.keys(campos).length === 0) {
      return res.status(400).json({
        error: "Se debe enviar al menos un campo para actualizar.",
      });
    }
  
    if (campos.nombre && typeof campos.nombre !== "string") {
      return res.status(400).json({ error: "El nombre debe ser una cadena de texto." });
    }
  
    if (campos.descripcion && typeof campos.descripcion !== "string") {
      return res.status(400).json({ error: "La descripción debe ser una cadena de texto." });
    }
  
    if (campos.precio !== undefined) {
      if (isNaN(campos.precio) || campos.precio < 0) {
        return res.status(400).json({ error: "El precio debe ser un número positivo." });
      }
    }
  
    if (campos.categoria_id !== undefined) {
      if (isNaN(campos.categoria_id) || campos.categoria_id <= 0) {
        return res.status(400).json({ error: "La categoría debe ser un número válido." });
      }
    }
  
    next();
  }
  