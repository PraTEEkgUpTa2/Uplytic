import express from 'express';
import {prismaClient} from 'db/client'
import { AuthInputSchema } from './types';

const app = express();

app.use(express.json());

app.post('/signup', async (req, res) => {

    const data = AuthInputSchema.safeParse(req.body);
    if(!data.success){
        return res.status(400).json(data.error)
    }

    try {
        const user = await prismaClient.user.create({
            data:{
                username: data.data.username,
                password: data.data.password
            }
        })

        res.json({
            id: user.id
        })
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }



})

app.post('/login', (req,res) => {

})

app.post('/website', async (req,res) => {
    const website = await prismaClient.website.create({
        data:{
            url: req.body.url,
            user: {
                connect: {
                    id: req.body.userId
                }
            }
        }
    })

    res.json({
        id: website.id,
    })
})

app.get('/website/:websiteId', (req,res) => {
    
})

app.listen(8080);