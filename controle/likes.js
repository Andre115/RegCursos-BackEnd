import { gerId_user } from "../auth/users.js";
import db from "../models/user.js";


function readLikes(req, res){

    const sql= "SELECT * FROM likes";

    db.query(sql, async (error, data)=>{
        if(error) res.json(error);

        return res.json(data)
    })
}


function createLike(req, res){

    //	*id_like(VARCHAR) *id_user(VARCHAR) *status_like( 1 or 0 ) 	*id_post(VARCHAR)	
    const sql= "SELECT * FROM likes WHERE id_user=(?) AND id_post=(?)";
    const id_user= req.body.id_user;
    const id_post= req.body.id_post;

    const values =[[id_user], [id_post]];
    db.query(sql, [...values], (error, data)=>{

        if(data.length===0){

            const sql= "INSERT INTO likes(id_like, id_user, id_post) VALUES(?)";
            const id_like= gerId_user(10);
            const id_user= req.body.id_user;
            const id_post= req.body.id_post;
            
            const values =[id_like, id_user, id_post];
            
            db.query(sql, [values], (error, data)=>{
                if(error) res.json(error);
                
                return res.status(200).json({status: 200, msg: "Like FEITO com sucesso"})
            })

        }else{

            return editLike(req, res, data[0].status_like, data);
          
        }
    })   
}


    //	*id_like(VARCHAR) *id_user(VARCHAR) *status_like( 1 or 0 ) *id_post(VARCHAR)	
    function deleteLike(req, res){
        
        const sql= "DELETE FROM likes WHERE id_user=(?) AND id_like=(?)";
        const id_user= req.body.id_user;
        const id_like= req.body.id_like;
    
    const values =[[id_user], [id_like]];
    
    db.query(sql, [...values], (error, data)=>{
        if(error) res.json(error);
        
        return res.status(200).json({status: 200, msg: "Like DELETADO com sucesso"})
    })   
}

	
function editLike(req, res, like){

    const sql= "UPDATE likes SET status_like=(?) WHERE id_user=(?) AND id_post=(?)";
    const status_like= !like ? 1 : 0;
    const id_user= req.body.id_user;
    const id_post= req.body.id_post;

    const values =[[status_like], [id_user], [id_post]];

    db.query(sql, [...values], (error, data)=>{
        if(error) res.json(error);

        res.status(200).json({status: 200, msg: "Like EDITADO com sucesso"})
    })
}


export { readLikes, createLike, deleteLike }