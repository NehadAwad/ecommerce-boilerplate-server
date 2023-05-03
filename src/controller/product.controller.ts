import { Request, Response } from "express";
import { Product } from "../entity/product.entity";

export const Products = async (req: Request, res: Response) => {
    const products = await Product.find();
    res.send(products);
}

export const CreateProduct = async (req: Request, res: Response) => {
 
    const product = await Product.save(req.body)
    res.status(201).send(product);
}

export const GetProduct = async (req: Request, res: Response) => {

    const product = await Product.findOne({ where: { id: parseInt(req.params.id) }})
    res.send(product);
}

export const UpdateProduct = async (req: Request, res: Response) => {
 
        await Product
            .createQueryBuilder()
            .update(Product)
            .set(req.body)
            .where("id = :id", { id: req.params.id })
            .execute();

        const data = await Product.findOne({
            where: { id: parseInt(req.params.id) }
        });
        console.log(data)

        res.send(data);

}

export const DeleteProduct = async (req: Request, res: Response) => {
    await Product.delete(req.params.id);
    res.status(204).send(null);
}