import { gerId_user } from "../auth/users.js";
import db from "../models/user.js";


function readComments(req, res){

    const sql= "SELECT * FROM comments";

    db.query(sql, async (error, data)=>{
        if(error) res.json(error);

        return res.json(data)
    })
}

function createComment(req, res){

    const sql= "INSERT INTO comments(id_comment, id_post, id_user, context) VALUES(?)";
    const id_comment= gerId_user(10);
    const id_post= req.body.id_post;
    const id_user= req.body.id_user;
    const context= req.body.context;

    const values =[id_comment, id_post, id_user, context];

    //return res.json(values)

    db.query(sql, [values], (error, data)=>{
        if(error) res.json(error);

        return res.status(200).json({status: 200, msg: "Comment FEITO com sucesso"})
    })

    

}

function deleteComment(req, res){

    const sql= "DELETE FROM comments WHERE id_user=(?) AND id_comment=(?)";
    const id_user= req.body.id_user;
    const id_comment= req.body.id_comment;

    const values =[[id_user], [id_comment]];

    db.query(sql, [...values], (error, data)=>{
        if(error) res.json(error);

        return res.status(200).json({status: 200, msg: "Comment DELETADO com sucesso"})
    })

}

function editComment(req, res){

    const sql= "UPDATE comments SET context=(?) WHERE id_user=(?) AND id_comment";
    const context= req.body.context;
    const id_user= req.body.id_user;
    const id_comment= req.body.id_comment;

    const values =[[context], [id_user], [id_comment]];

    db.query(sql, [...values], (error, data)=>{
        if(error) res.json(error);

        return res.status(200).json({status: 200, msg: "Comment EDITADO com sucesso", data})
    })

}

export { readComments, createComment, deleteComment, editComment }