import express from 'express';
const routers= express.Router();
import { readUser, creatUser, findUser, getUser } from "../controle/user.js" ;
import { checkToken } from "../auth/users.js";

import { readPosts, createPost, deletePost, editPost } from "../controle/posts.js" ;
import { createComment, deleteComment, editComment, readComments } from '../controle/comments.js';
import { createLike, deleteLike, readLikes } from '../controle/likes.js';

//Routers- Users
routers.get('/users', readUser)
routers.post('/finduser', findUser)
routers.post('/create', creatUser);
routers.get('/user/:id', checkToken, getUser);

//Routers- Posts
routers.get('/posts', readPosts)
routers.post('/createpost', createPost)
routers.delete('/deletepost/:id_user/:id_post', deletePost)
routers.put('/editpost', editPost)

//Routers- Comments
routers.get('/comments', readComments)
routers.post('/createcomment', createComment)
routers.delete('/deletecomment', deleteComment)
routers.put('/editcomment', editComment)

//Routers- Likes
routers.get('/likes', readLikes)
routers.post('/createlikes', createLike)
routers.delete('/deletelikes', deleteLike)


export default routers;