import { gerId_user } from "../auth/users.js";
import db from "../models/user.js";

function readPosts(req, res){

    const sql= "SELECT * FROM posts ORDER BY position DESC";
    const sql2= "SELECT p.id_post,p.id_user,p.private,p.url_midia,p.context,p.created_at,u.name,image_profile FROM posts AS p LEFT JOIN users AS u ON(p.id_user=u.id_user) ORDER BY p.position DESC";

    db.query(sql2, async (error, data)=>{
        if(error) res.json(error);

        return res.json(data)
    })
}

function createPost(req, res){

    const sql= "INSERT INTO posts(id_post, id_user, private, context) VALUES(?)";
    const id_post= gerId_user(10);
    const id_user= req.body.id_user;
    const private_post= req.body.private;
    const context= req.body.context;

    const values =[id_post, id_user, private_post, context];

    db.query(sql, [values], (error, data)=>{
        if(error) res.json(error);

        return res.status(200).json({status: 200, msg: "Post feito com sucesso"})
    })

}

function deletePost(req, res){

    const sql= "DELETE FROM posts WHERE id_user=(?) AND id_post=(?)";
    const id_user= req.params.id_user;
    const id_post= req.params.id_post;

    const values =[[id_user], [id_post]];

    //return res.json(values)
    
    db.query(sql, [...values], (error, data)=>{
        if(error) res.json(error);

        return res.status(200).json({status: 200, msg: "Post DELETADO com sucesso", data})
    });

    
}

function editPost(req, res){

    const sql= "UPDATE posts SET post=(?) WHERE id_user=(?) AND id_post=(?)";
    const context= req.body.context;
    const id_user= req.body.id_user;
    const id_post= req.body.id_post;

    const values =[[context], [id_user], [id_post]];

    db.query(sql, [...values], (error, data)=>{
        if(error) res.json(error);

        return res.status(200).json({status: 200, msg: "Post EDITADO com sucesso", data})
    })

}

export { readPosts, createPost, deletePost, editPost }