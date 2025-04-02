import Categoria from "../models/Categoria.js";



class CategoriaController{
    static getAllCategorias = async (req, res) => {
        const OBJCategoria = new Categoria();
        const categorias = await OBJCategoria.getAll();
        
        res.json(categorias);
    }
    static createCategoria=async (req,res) => {
        try {
            const {nombre, descripcion}=req.body;
        const OBJCategoria= new Categoria();
        const categoria= await OBJCategoria.create(nombre, descripcion);
        res.status(201)
        json(categoria)
        } catch (error) {
            throw new Error({error: error,Message});
            
        }
        
    }
    static actualizarCategoria= async (req, res) =>{
        console.log(req.params);
        const {id}=req.params;
        
        const {nombre, descripcion}=(req.body);
        try {
            const OBJCategoria=new Categoria();
            const categoria= await OBJCategoria.update(nombre, descripcion, id);
            res.json(categoria);
        } catch (error) {
            res.status(500).json({error: error.Message});
        }
    }

    static actualizarParcialCategoria=  (req, res) => {
        const campo=req.body;
        const {id}=req.params;
        console.log(Object.keys(campo).length);
        let sql ="UPDATE categorias SET ";

        for (let cont = 0; cont < Object.keys(campo),length; cont++) {
            
            let value=Object.keys(campo)[cont];
            sql += `${value} = '${campo[value]}'`;

            if (cont == Object.keys(campo).length-1) {
                sql += ""
            }
            else
            {
                sql += ","
            }
        }
        sql += ` WHERE id= ${id}`;
        console.log(sql);
        
    }
}

export default CategoriaController;