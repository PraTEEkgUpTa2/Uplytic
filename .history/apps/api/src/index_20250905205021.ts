import express from 'express';
import {prismaClient} from 'db/client'
import { AuthInputSchema } from './types';

const app = express();

app.use(express.json());

app.post('/signup', (req, res) => {

    const data = AuthInputSchema.safeParse(req.body);
    if(!data.success){
        return res.status(400).json(data.error)
    }

})

app.post('/login', (req,res) => {

})

app.post('/website', async (req,res) => {
    const website = await prismaClient.website.create({
        data:{
            url: req.body.url
        }
    })

    res.json({
        id: website.id,
    })
})

app.get('/website/:websiteId', (req,res) => {
    
})

app.listen(8080);