import { Request, Response } from "express";
import { Role } from "../entity/role.entity";

interface RequestBody {
    name: string;
    permissions: number[];
}

export const Roles = async (req: Request, res: Response) => {
    return res.send(await Role.find());
}

export const CreateRole = async (req: Request, res: Response) => {
    const { name, permissions }: RequestBody = req.body;

    const role = await Role.save({
        name,
        permission: permissions.map(id => ({id}))
    })

    res.send(role);
}

export const GetRole =async (req: Request, res: Response) => {
    res.send(await Role.findOne({
        where: { id: parseInt(req.params.id) }, 
        relations: { permission: true }
    }))
    
}

export const UpdateRole =async (req: Request, res: Response) => {
    const { name, permissions }: RequestBody = req.body;

    const role = await Role.save({
        id: parseInt(req.params.id),
        name,
        permission: permissions.map(id => ({id}))
    })

    res.send(role);
}

export const DeleteRole =async (req: Request, res: Response) => {
    await Role.delete(req.params.id);

    res.send(null);
}