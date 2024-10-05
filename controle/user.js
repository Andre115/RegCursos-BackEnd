import db from "../models/user.js"
import {hashPassword, comparePassword, gerId_user} from '../auth/users.js'
import jwt from "jsonwebtoken"

function readUser(req, res){
        const sql= "SELECT id_user, name, carg, image_profile FROM users";
        try {
            db.query(sql, (error, data)=>{
                if(error) res.send(error)

                return res.status(200).json( data )
              })    
        } catch (error) {
            res.status(501).json("Erro Internal, conection " + error);
            
        }        
}

async function creatUser(req, res){
    const id_user= gerId_user(10);
    const name= req.body.name;
    const email= req.body.email;
    const passwordHash= await hashPassword(req.body.password);
    const password= passwordHash;
    db.query("SELECT * FROM users WHERE email = ?",[email], (err, result)=>{
        if(err) res.json(err);

        if(result.length === 0){
            const  sql= "INSERT INTO users(id_user, name, email, password) VALUES(?)";
            const values= [id_user, name, email, password];

            db.query(sql, [values], (error, data)=>{
                if(error) res.json(error);

                return res.json({error: false, msg: "Usuário cadastrado com sucesso!"})
        })

        }else{
            res.json({error: true, msg: "Usuário já existente!"}); 
        }

    } )   
}

 function findUser(req, res){
    const sql= "SELECT * FROM users WHERE email=(?)";
    const {email, password}= req.body;
    
    db.query(sql, [[email]], async (error, data)=>{
        if(error) res.status(500).json(error);
        
        if(data.length===0){
            return res.status(404).json({error: true, msg: "Usuário não cadastrado!"});
        }else{

            const passwordHash= await comparePassword(password, data[0].password)
            if(passwordHash){
                const secret= process.env.SECRET_KEY;
                const dataUser= {
                    position: data[0].position,
                    id_user: data[0].id_user,
                    name: data[0].name,
                    email: data[0].email,

                }

                const token= jwt.sign(dataUser, secret, {expiresIn: "1h"});

                res.status(200).json({error: false, id_user: data[0].id_user, msg: 'Autenticação realizada com sucesso!', token});

            }else{
                return res.json({error: true, msg: 'Senha incorreta!', authenticated:false});
            }
        }

    })
}

function getUser(req, res){
    const id= req.params.id;

    const sql= "SELECT position, id_user, name, email FROM users WHERE id_user=(?)";
    db.query(sql,[[id]], (error, data)=>{
        if(error) res.status(500).json(error);
        if(data.length===0){
            return res.status(404).json({errorr: true, msg:'Usuario não encontrado!'});
        }else{
            res.json({errorr: false, msg:'Usuario encontrado com sucesso!', authenticated:true , data});

        }
        
    })


}



export {readUser, creatUser, findUser, getUser};

