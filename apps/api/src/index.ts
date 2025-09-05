import dotenv from 'dotenv'
import express from 'express';
import {prismaClient} from 'db/client'
import { AuthInputSchema } from './types';
import jwt from 'jsonwebtoken'
import { authMiddleware } from './middleware';

const app = express();

app.use(express.json());
dotenv.config();

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

app.post('/login', async (req,res) => {
    const data = AuthInputSchema.safeParse(req.body);
    if(!data.success){
        return res.status(400).json(data.error)
    }

    const user = await prismaClient.user.findFirst({
        where:{
            username: data.data.username,
        }
    })

    if(!user || user.password !== data.data.password){
        return res.status(401).json({message: 'Invalid credentials'})
    }

    let token = jwt.sign({
        sub: user.id
    }, process.env.JWT_SECRET!)

    res.json({
        jwt: token
    })

})

app.post('/website', authMiddleware, async (req,res) => {
    const website = await prismaClient.website.create({
        data:{
            url: req.body.url,
            userId: req.userId!,
        }
    })

    res.json({
        id: website.id,
    })
})

app.get('/status/:websiteId', authMiddleware, (req,res) => {
    const website = prismaClient.website.findFirst({
        where:{
            userId: req.userId!,
            id: req.params.websiteId
        },
        include:{
            checks:{
                orderBy: [{
                    createdAt: 'desc'
                }],
                take: 1
            }
        }
    })
})

app.listen(8080);