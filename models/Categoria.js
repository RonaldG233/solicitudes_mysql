import connection from "../utils/db.js";
 
class Categoria {
    // constructor(nombre,descripcion) {
    //     this.nombre = nombre;
    //     this.descripcion = descripcion;
    // }
    /**
    // *metodo para obtener los registros de la base de datos
    //  @returns {Array}Listado de los productos en un arreglo
    // */
    async getAll(){
        try {
            const [rows] = await connection.query("SELECT * FROM categorias");
            return rows;
        } catch (error) {
            throw new Error("Error al obtener las categorias");
        }
        

    }
    async create(nombre, descripcion){
        try {
            const [result]= await connection.query("INSERT INTO categorias(nombre, descripcion) VALUES (?,?)", [this.nombre, this.descripcion]);
        return {
            id:result.id,
            nombre: nombre,
            descripcion: descripcion
        };
        } catch (error) {
            throw new Error("error al crear la categoria");
            
        }
    }
    async update(nombre, descripcion, id){
        try {
            console.log("desde la clase", nombre, descripcion, id);

            const [result]= await connection.query('UPDATE CATEGORIAS SET nombre = ? , descripcion = ? WHERE id = ? ', 
                [nombre, descripcion, id]);

            if (result.affectedRows === 0) {
                throw new Error("Categoria no encontrada");
            }
            return {id, nombre: this.nombre, descripcion: this.descripcion}
        } catch (error) {
            console.log(error);
        }
       
        ' update categorias set nombre = "bla bla", descripcion = "otro bla bla" where id= 6'; 
        
    }

    async patch(id, nombre, descripcion, campo)
    {
        for (let cont = 0; cont < Object.keys(campo).length; cont++) {
            let value=Object.keys(campo)[cont];
            sql += `${value} = '${campo[value]}'`;
            cont += Object.keys(campo).length-1 ? sql += "" : sql += ",";
            
        }
        sql += ` WHERE id= ${id}`;
        await [result]
    }
}

export default Categoria;