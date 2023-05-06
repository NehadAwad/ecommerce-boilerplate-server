import { Request, Response } from "express";
import { User } from "../entity/user.entity";
import bcyptjs from 'bcryptjs';

export const Users = async (req: Request, res: Response) => {
    const take = 15;
    const page = parseInt(req.query.page as string || '1')
    // const users = await User.find({
    //     relations: ['role']
    // });
    const [data, total] = await User.findAndCount({
        take,
        skip: (page - 1) * take,
        relations: ['role']
    });

    // res.send(users.map(user => {
    //     const { password, ...data } = user;

    //     return data;
    // }));

    res.send({
        data: data.map(user => {
            const { password, ...data } = user;
    
            return data;
        }),
        meta: {
            total,
            page,
            last_page: Math.ceil(total/take)
        }
    });
}

export const CreateUser = async (req: Request, res: Response) => {
    const { role_id, ...body } = req.body;
    const hashedPassword = await bcyptjs.hash('aaaaaaaa', 10);

    const { password, ...user } = await User.save({
        ...body,
        password: hashedPassword,
        role: {
            id: role_id
        }
    })

    res.status(201).send(user);
}

export const GetUser = async (req: Request, res: Response) => {
    const { password, ...user } = await User.findOne({
        where: { id: parseInt(req.params.id) },
        relations: { role: true }
    })

    res.send(user);
}

export const UpdateUser = async (req: Request, res: Response) => {

    // try {
        
    // } catch (error) {
    //     console.log(error)
    //     res.status(400).send({
    //         message: error
    //     })
    // }

    const { role_id, ...body } = req.body;
        await User
            .createQueryBuilder()
            .update(User)
            .set({ ...body, role: { id: role_id } })
            .where("id = :id", { id: req.params.id })
            .execute();

        const {password, ...data} = await User.findOne({
            where: { id: parseInt(req.params.id) }, 
            relations: { role: true }
        });
        console.log(data)

        res.send(data);

}

export const DeleteUser = async (req: Request, res: Response) => {
    await User.delete(req.params.id);
    res.status(204).send(null);
}