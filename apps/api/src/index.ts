import dotenv from 'dotenv'
import express from 'express';
import {prismaClient} from 'db/client'
import { AuthInputSchema } from './types';
import jwt from 'jsonwebtoken'
import { authMiddleware } from './middleware';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

app.use(express.json());
dotenv.config();
app.use(cookieParser());

app.use(cors({
    origin: "https://uplytic-web.vercel.app",
    credentials: true
}))

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

        res.status(200).json({
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

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,

    })

    res.status(200).json({
        message: 'Logged in successfully',
        id: user.id,
        username: user.username,
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

app.post('/region', async (req,res) => {
    
    const regionName = req.body.regionName;

    const region = await prismaClient.region.findUnique({
        where:{
            name: regionName
        }
    })
    

    if(!region){
        const newRegion = await prismaClient.region.create({
            data:{
                name: regionName
            }
        })
        return res.json({id: newRegion.id});
    }

    res.json({id: region.id});

    
})



app.get('/status/:websiteId', authMiddleware, async (req,res) => {
    const website = await prismaClient.website.findFirst({
        where:{
            userId: req.userId!,
            id: req.params.websiteId
        },
        include:{
            checks:{
                orderBy: [{
                    createdAt: 'desc'
                }],
                take: 10
            }
        }
    })

    if(!website){
        return res.status(404).json({message: 'Website not found'});
    }

    res.json({
        url: website.url,
        id: website.id,
        userId: website.userId,
    })
})

app.get('/websites', authMiddleware, async (req,res) => {
    const websites = await prismaClient.website.findMany({
        where:{
            userId: req.userId!
        },
        include: {
            checks:{
                orderBy: [{
                    createdAt: 'desc'
                }],
                take: 1
            }
        }
    })

    res.json(websites);
})

app.listen(8080, () => {
    console.log('Server started on port 8080');
});
