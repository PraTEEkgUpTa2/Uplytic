import { NextFunction, Request, Response } from "express";
import jwt  from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const authMiddleware = async (req: Request,res: Response,next: NextFunction) => {

     const token = req.cookies.token;

    try {
        let data = jwt.verify(token, process.env.JWT_SECRET!);
        req.userId = data.sub as string;
        next();
    } catch (error) {
        res.status(401).json({message: 'Unauthorized'})
    }
}