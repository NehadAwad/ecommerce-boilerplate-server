import express, { Request, Router } from "express";
import { AuthenticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword } from "./controller/auth.controller";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { CreateUser, DeleteUser, GetUser, UpdateUser, Users } from "./controller/user.controller";
import { Permissions } from "./controller/permission.controller";
import { CreateRole, DeleteRole, GetRole, Roles, UpdateRole } from "./controller/role.controller";
import { CreateProduct, DeleteProduct, GetProduct, Products, UpdateProduct } from "./controller/product.controller";
import { Upload } from "./controller/image.controller";
import { Export, Orders } from "./controller/order.controller";


export const routes = ( router: Router) => {

    // authentication
    router.post('/api/register', Register);
    router.post('/api/login', Login);
    router.get('/api/user', AuthMiddleware, AuthenticatedUser);
    router.post('/api/logout', AuthMiddleware, Logout);
    router.put('/api/users/info', AuthMiddleware, UpdateInfo);
    router.put('/api/users/password', AuthMiddleware, UpdatePassword); 

    
    // user
    router.get('/api/users', AuthMiddleware, Users);
    router.post('/api/users', AuthMiddleware, CreateUser);
    router.get('/api/users/:id', AuthMiddleware, GetUser);
    router.put('/api/users/:id', AuthMiddleware, UpdateUser);
    router.delete('/api/users/:id', AuthMiddleware, DeleteUser);

    // permission
    router.get('/api/permissions', AuthMiddleware, Permissions);   

    // role
    router.get('/api/roles', AuthMiddleware, Roles);
    router.post('/api/roles', AuthMiddleware, CreateRole);
    router.get('/api/roles/:id', AuthMiddleware, GetRole);
    router.put('/api/roles/:id', AuthMiddleware, UpdateRole);
    router.delete('/api/roles/:id', AuthMiddleware, DeleteRole);

    // products
    router.get('/api/products', AuthMiddleware, Products);
    router.post('/api/products', AuthMiddleware, CreateProduct);
    router.get('/api/products/:id', AuthMiddleware, GetProduct);
    router.put('/api/products/:id', AuthMiddleware, UpdateProduct);
    router.delete('/api/products/:id', AuthMiddleware, DeleteProduct);

    // image
    router.post('/api/upload', AuthMiddleware, Upload);
    router.use('/api/uploads', express.static('./uploads'));

    // orders
    router.get('/api/orders', AuthMiddleware, Orders);
    router.get('/api/export', AuthMiddleware, Export)


}