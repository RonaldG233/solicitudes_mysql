import connection from "../utils/db.js";

class Categoria {
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM categorias");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener las categorías");
    }
  }

  async create(nombre, descripcion) {
    try {
      const [result] = await connection.query(
        "INSERT INTO categorias(nombre, descripcion) VALUES (?, ?)",
        [nombre, descripcion]
      );
      return {
        id: result.insertId,
        nombre,
        descripcion
      };
    } catch (error) {
      throw new Error("Error al crear la categoría");
    }
  }

  async update(nombre, descripcion, id) {
    try {
      const [result] = await connection.query(
        "UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?",
        [nombre, descripcion, id]
      );

      if (result.affectedRows === 0) {
        throw new Error("Categoría no encontrada");
      }

      return { id, nombre, descripcion };
    } catch (error) {
      throw new Error("Error al actualizar la categoría");
    }
  }

  async patch(id, campos) {
    let sql = "UPDATE categorias SET ";
    const valores = [];

    const keys = Object.keys(campos);
    keys.forEach((key, index) => {
      sql += `${key} = ?`;
      if (index < keys.length - 1) sql += ", ";
      valores.push(campos[key]);
    });

    sql += " WHERE id = ?";
    valores.push(id);

    try {
      const [result] = await connection.query(sql, valores);
      if (result.affectedRows === 0) {
        throw new Error("Categoría no encontrada para actualizar");
      }
      return { id, ...campos };
    } catch (error) {
      throw new Error("Error al actualizar parcialmente la categoría");
    }
  }

  async delete(id) {
    try {
      // Validar si existen productos asociados a la categoria
      const [productos] = await connection.query(
        "SELECT COUNT(*) AS cantidad FROM productos WHERE categoria_id = ?",
        [id]
      );

      if (productos[0].cantidad > 0) {
        throw new Error("No se puede eliminar la categoría porque tiene productos asociados.");
      }

      // Si no hay productos, eliminar la categoria
      const [result] = await connection.query(
        "DELETE FROM categorias WHERE id = ?",
        [id]
      );

      if (result.affectedRows === 0) {
        throw new Error("Categoría no encontrada.");
      }

      return { mensaje: "Categoría eliminada correctamente." };

    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default Categoria;
