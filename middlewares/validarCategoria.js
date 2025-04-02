export const validarCategoria =(req, res)=>{
    const {nombre, descripcion}=req.body;
    if (!nombre || nombre.trim()===""  ){
        return res.status(400).json({mensaje: "el nombre de la categoria es obligatorio"})
    }
    if (!descripcion || descripcion.trim()===""  ){
        return res.status(400).json({mensaje: "la descripcion de la categoria es obligatorio"})
    }
    next();
    
    
}