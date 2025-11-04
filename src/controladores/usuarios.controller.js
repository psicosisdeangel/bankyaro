import { getConnection } from "../database/database.js"



const createUser = async (req, res) =>{
    try{
        const{numeroId, nombre, edad, correo, ciudad} = req.body;
        const data = {numeroId, nombre, edad, correo, ciudad}
        const connection = await getConnection();
        const result = await connection.query('INSERT INTO usuarios SET ?', [data]);
        res.json({message:"Usuario, creado"})

    }
    catch(err){
        console.log(err);
    }

}
    


export const methodsUsers = {
    createUser,

}