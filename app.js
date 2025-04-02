import express from "express";
import bodyParser from "body-parser";

import categoriasRoutes from "./routes/categoriasRoutes.js";
import productos_routes from "./routes/productos_routes.js";


const app = express();
app.use(bodyParser.json());

app.use(express.urlencoded({"extended":true}));
app.use('/categorias',categoriasRoutes);
app.use("/productos",productos_routes);



app.listen(3000,() =>{
    console.log("hola chavales");
    
});