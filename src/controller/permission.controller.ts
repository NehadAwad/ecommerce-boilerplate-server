import { Request, Response } from "express";
import { Permission } from "../entity/permission.entity";

export const Permissions = async (req: Request, res: Response) => {
    try {
        res.send(await Permission.find());
    } catch (error) {
        return res.send({
            message: "not found"
        })
    }
} 