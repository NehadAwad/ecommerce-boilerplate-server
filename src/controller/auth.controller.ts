import { Request, Response } from "express";
import { RegisterValidation } from "../validation/register.validation";
import { User } from "../entity/user.entity";
import bcyptjs from "bcryptjs";
import { sign, verify, JwtPayload } from "jsonwebtoken";


export const Register = async (req: Request, res: Response) => {
    const body = req.body;

    const { error } = RegisterValidation.validate(body);

    if (error) {
        return res.status(400).send(error.details);
    }

    if (body.password !== body.password_confirm) {
        return res.status(400).send({
        });
    }

    const user = User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: await bcyptjs.hash(body.password, 10)
    });

    await user.save();

    res.send(user);
}

export const Login = async (req: Request, res: Response) => {

    const user = await User.findOne({
        where: { email: req.body.email }
    });

    if (!user) {
        return res.status(404).send({
            message: 'user not found'
        })
    }

    if (! await bcyptjs.compare(req.body.password, user.password)) {
        return res.status(404).send({
            message: 'user not found'
        })
    }

    const token = sign({ id: user.id }, process.env.JWT_SECRET);

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    res.send({
        message: 'success'
    })
}

export const AuthenticatedUser = async (req: Request, res: Response) => {
    const { password, ...user } = req['user'];

    res.send(user);
}

export const Logout = async (req: Request, res: Response) => {
    res.cookie('jwt', '', { maxAge: 0 });

    return res.send({
        message: 'success'
    })
}

export const UpdateInfo = async (req: Request, res: Response) => {
    const user = req['user'];
    await User
        .createQueryBuilder()
        .update(User)
        .set(req.body)
        .where("id = :id", { id: user.id })
        .execute();

    const { password, ...data } = await User.findOne({
        where: { id: user.id }
    });

    res.send(data);

}

export const UpdatePassword = async (req: Request, res: Response) => {
    const user = req['user'];

    if (req.body.password !== user.password_confirm) {
        return res.status(400).send({
            message: "Password's do not match"
        });
    }

    await User
        .createQueryBuilder()
        .update(User)
        .set({ password: await bcyptjs.hash(req.body.password, 10) })
        .where("id = :id", { id: user.id })
        .execute();

    const { password, ...data } = await User.findOne({
        where: { id: user.id }
    });

    res.send(data);

}