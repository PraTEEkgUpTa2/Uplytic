import express from 'express';
import {prismaClient} from 'db/client'

const app = express();

app.use(express.json());

app.post('/signup', (req, res) => {

})

app.post('/login', (req,res) => {

})

app.post('/website', (req,res) => {
    prismaClient.website.create({
        data:{
            url: req.body.url
        }
    })
})

app.get('/website/:websiteId', (req,res) => {
    
})

app.listen(8080);