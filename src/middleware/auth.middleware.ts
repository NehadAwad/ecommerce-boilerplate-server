import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../entity/user.entity";

export const AuthMiddleware = async (req: Request, res: Response, next: Function) => {
    try {
        const jwt = req.cookies['jwt'];

        const payload:any = verify(jwt, process.env.JWT_SECRET);

        if(!payload) {
            return res.status(401).send({
                message: 'unauthenticated'
            });
        }

        const user = await User.findOne({
            where: {    id: payload.id },
            relations: {
                role: {
                    permission: true
                }
            },
        });

        req['user'] = user;

        next();

    } catch (error) {
        return res.status(401).send({
            message: 'unauthenticated'
        });
    }
}