import connection from "../utils/db.js";
 
class Categoria {
    constructor(nombre,descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
    /**
    // *metodo para obtener los reistros de la base de datos
    // Listado de las
    // */
    async getAll(){
        try {
            const [rows] = await connection.query("SELECT * FROM categorias");
            return rows;
        } catch (error) {
            throw new Error("Error al obtener las categorias");
        }
        

    }
    async create(){
        try {
            const [result]= await connection.query("INSERT INTO categorias(nombre, descripcion) VALUES (?,?)", [this.nombre, this.descripcion]);
        return {
            id:result.id,
            nombre:this.nombre,
            descripcion:this.descripcion
        };
        } catch (error) {
            throw new Error("ERROR AL CREAR LA CATEGORIA");
            
        }
    }
}

export default Categoria;