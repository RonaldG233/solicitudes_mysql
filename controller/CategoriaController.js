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
}

export default CategoriaController;