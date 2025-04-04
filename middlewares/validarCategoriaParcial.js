export function validarCategoriaParcial(req, res, next) {
    const campos = req.body;
  
    if (Object.keys(campos).length === 0) {
      return res.status(400).json({
        error: "Se debe enviar al menos un campo para actualizar.",
      });
    }
  
    if (campos.nombre && typeof campos.nombre !== "string") {
      return res.status(400).json({
        error: "El nombre debe ser una cadena de texto.",
      });
    }
  
    if (campos.descripcion && typeof campos.descripcion !== "string") {
      return res.status(400).json({
        error: "La descripción debe ser una cadena de texto.",
      });
    }
  
    next();
  }
  