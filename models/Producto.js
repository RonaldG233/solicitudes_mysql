import connection from "../utils/db.js";

class Producto{
  constructor(nombre,descripcion,precio,categoria_id) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio=precio;
    this.categoria_id=categoria_id;
  }
  /**
   * Metodo para obtener los registros de la base de dato
   * @returns {Array} Listado de los productos en un arreglo
   */
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM productos");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los productos")
    } 
  }

  async create() {
    try {
      const [result] = await connection.query("INSERT INTO productos (nombre,descripcion,precio,categoria_id) values (?,?,?,?)", 
        [this.nombre, this.descripcion,this.precio,this.categoria_id]);
      return {
      id: result.insertId,
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio:this.precio,
      categoria_id:this.categoria_id
    };
    } catch (error){
      throw new Error("Error al crear el producto");
    }
  }

  async update(nombre, descripcion, precio, categoria_id, id) {
    try {
      const [result] = await connection.query(
        "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, categoria_id = ? WHERE id = ?",
        [nombre, descripcion, precio, categoria_id, id]
      );

      if (result.affectedRows === 0) {
        throw new Error("Producto no encontrado");
      }

      return {
        id,
        nombre,
        descripcion,
        precio,
        categoria_id,
      };
    } catch (error) {
      throw new Error("Error al actualizar el producto");
    }
  }

  
  async patch(id, campos) {
    try {
      let sql = "UPDATE productos SET ";
      const valores = [];

      const keys = Object.keys(campos);
      keys.forEach((campo, index) => {
        sql += `${campo} = ?`;
        if (index < keys.length - 1) sql += ", ";
        valores.push(campos[campo]);
      });

      sql += " WHERE id = ?";
      valores.push(id);

      const [result] = await connection.query(sql, valores);

      if (result.affectedRows === 0) {
        throw new Error("Producto no encontrado para actualizar");
      }

      return { id, ...campos };
    } catch (error) {
      throw new Error("Error al actualizar parcialmente el producto");
    }
  }

  async delete(id) {
    const [result] = await connection.query(
      "DELETE FROM productos WHERE id = ?",
      [id]
    );
  
    if (result.affectedRows === 0) {
      throw new Error("Producto no encontrado");
    }
  
    return { mensaje: "Producto eliminado correctamente" };
  }
  
  
}

export default Producto;