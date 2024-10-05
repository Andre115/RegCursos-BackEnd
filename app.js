import * as dotenv from 'dotenv';
import path from "path"
dotenv.config();
import multer from 'multer';
// Libs
import express from 'express';
const app= express();
import cors from 'cors';
// Inportes
import routers from './routes/index.js';
import { gerId_user } from './auth/users.js';

// Uses
const port= 3300;
app.use(express.static('public'));
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));


//TODAS ROTAS
app.use(routers);

const upload= (dirResolve)=>{
  
  const allUpload= multer({
    storage: multer.diskStorage({
      destination: path.resolve(dirResolve),
      filename: (req, file, cb)=> cb(null, gerId_user(10) + path.extname(file.originalname)),
    })
  })

  return allUpload;
  
}

app.post('/imageuser', upload('./uploads/images/users').single('imageuser'), (req, res)=>{
  res.send('Imagem de USER enviado com sucesso!!')
})

app.post('/imagepost', upload('./uploads/images/posts').single('imagepost'), (req, res)=>{
  res.send('Imagem de POST enviado com sucesso!!')
})

app.post('/file', upload('./uploads/pdfs').single('file'), (req, res)=>{
  res.send('AQUIVO enviado com sucesso!!')
})

app.use('/imageusers', express.static(path.resolve('./uploads/images/users')));
app.use('/imageposts', express.static(path.resolve('./uploads/images/posts')));
app.use('/files', express.static(path.resolve('./uploads/pdfs')));


//TESTE
app.get("/teste/:id/:name", (req, res)=>{
  const id= req.params.id;
  const name= req.params.name;
  res.json({error: true, msg: "Funcionou...GET", id, name});
})

app.post("/teste", (req, res)=>{
  res.json({error: true, msg: "Funcionou....POST"});
})

app.listen(port, (req, res)=>{
  console.log(`Rodando na porta ${port}...`);
})


