import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import UserModel from '../models/User';

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Set token from Bearer token
        token = req.headers.authorization.split(' ')[1];
    }

    // Set token from cookie
    // else if (req.cookies.apCookie) {
    //     token = req.cookies.apCookie;
    // }

    if (!token) {
        return res.status(401).json({
            success: false,
            errors: {
                msg: 'Not authorized to access this resource'
            }
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        const { id } = decoded as TokenPayload;
        req.user = await UserModel.findById(id)
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            errors: {
                msg: 'Not authorized to access this resource'
            }
        });
    }
}

export const authorize = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                errors: {
                    msg: 'User not authorized to access resource'
                }
            });
        }
        next();
    };
};