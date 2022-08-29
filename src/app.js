import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());


app.get("/tweets", (req, res)=>{
    res.send('teste');
    console.log('teste console')
})

app.listen(5000)