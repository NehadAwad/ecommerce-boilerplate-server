import { Router } from "express";
import { AuthenticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword } from "./controller/auth.controller";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { CreateUser, DeleteUser, GetUser, UpdateUser, Users } from "./controller/user.controller";
import { Permissions } from "./controller/permission.controller";
import { CreateRole, DeleteRole, GetRole, Roles, UpdateRole } from "./controller/role.controller";

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

    //permission
    router.get('/api/permissions', AuthMiddleware, Permissions);   

    //role
    router.get('/api/roles', AuthMiddleware, Roles);
    router.post('/api/roles', AuthMiddleware, CreateRole);
    router.get('/api/roles/:id', AuthMiddleware, GetRole);
    router.put('/api/roles/:id', AuthMiddleware, UpdateRole);
    router.delete('/api/roles/:id', AuthMiddleware, DeleteRole);


}