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

const getUsuarios = async (req, res) => {
    try{
        const connection = await getConnection();
        const result = await connection.query('SELECT numeroId, nombre, edad, correo, ciudad FROM usuarios')

        res.json(result[0]);
    }catch(error){
        console.log(error);
    }

    }


    


export const methodsUsers = {
    createUser,
    getUsuarios

}