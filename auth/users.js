import bcrypt from 'bcrypt'
//const {v4: uuidv4}= require('uuid')
import { nanoid } from 'nanoid';
import jwt from "jsonwebtoken"


const hashPassword= async (password)=>{

    const saltRounds= 8;
    const hashedPassword= await bcrypt.hash(password, saltRounds);

    return hashedPassword;
}

const comparePassword= async (password, hashedPassword)=>{
    return await bcrypt.compare(password, hashedPassword)
}


const gerId_user= (complex)=>{
    return nanoid(complex);
}

const checkToken= (req, res)=>{
    const authHeader= req.headers['authorization'];
    const token= authHeader && authHeader.split(" ")[1];
     if(!token){
        return res.status(400).json({msg: "Acesso não autorizado!"})
     }

     try {

        const secret= process.env.SECRET_KEY;

        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.json({msg:'Erro ao verificar o token.', authenticated: false});

            } else {
                return res.status(200).json({msg:'Token verificado', authenticated: true, decoded});
            }
        })

        
     } catch (error) {
        return res.status(401).json({msg: "Acesso não autorizado!"})
        
     }

    
}



export {hashPassword, comparePassword, gerId_user, checkToken};