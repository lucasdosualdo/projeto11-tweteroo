import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

app.post("/sign-up", (req, res)=>{
    const signUp = req.body;
    
    function isURL (url){
        if (url.match(/^https?:\/\/.+\/.+$/)){
            return true;
        } else {
            return false;
        }
    }
   
    if (!signUp.username || !signUp.avatar){
        res.status(400).send("Todos os campos são obrigatórios!");
        return;
    } else if (!isURL(signUp.avatar)){
        res.status(400).send("Adicione um URL válida!");
    }
    users.push(signUp);
    res.status(201).send("Ok");
})

app.get("/tweets", (req, res)=>{
    res.send('teste');
    console.log('teste console')
})

app.listen(5000)