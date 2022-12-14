import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const users = [];
let tweets = [];

app.post("/sign-up", (req, res)=>{

    const signUp = req.body;
    const url = signUp.avatar.match(/^https?:\/\/.+\/.+$/);
   
    if (!signUp.username || !signUp.avatar ){
        res.status(400).send("Todos os campos são obrigatórios!");
        return;
    } else if (!url){
        res.status(400).send("Adicione uma URL válida!");
        return;
    }
   
    users.push(signUp);
    res.status(201).send("Ok");
    console.log(users);
});

app.post("/tweets", (req, res)=> {
    const tweet = req.body;
    if (!tweet.tweet ){
        res.status(400).send("Digite um tweet!");
        return;
    }
    if (!users.find(user=>user.username===tweet.username)){
        res.status(400).send("Nome de usuário inválido!");
        return;
    }
    let infoUser = users.filter(user=>user.username===tweet.username);
    infoUser = infoUser[infoUser.length-1];
    const avatar = infoUser.avatar;
    tweets.push(
        {...tweet,
            avatar
    });
    tweets.splice(0, 0, tweets[tweets.length-1]);
    tweets.splice(tweets.length-1, 1);
    res.status(201).send("Ok");
});

app.get("/tweets", (req, res)=>{
    let visibleTweets = [...tweets];
    if (tweets.length > 10){
        visibleTweets = visibleTweets.slice(0, 10);
        res.send(visibleTweets);
    }

    res.send(tweets);
    console.log('teste console')
});

app.listen(5000)