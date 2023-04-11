import { Permission } from "../entity/permission.entity";
import { AppDataSource } from "../core/database-config";
import { Role } from "../entity/role.entity";

AppDataSource.initialize()
    .then(async connection => {
        const perms = ['view_users', 'edit_users', 'view_roles', 'edit_roles', 'view_products', 'edit_products', 'view_orders', 'edit_orders'];

        let permissions = [];

        for (let i = 0; i < perms.length; i++) {
            permissions.push(await Permission.save({
                name: perms[i]
            }));
        }

        await Role.save({
            name: 'Admin',
            permission: permissions
        });

        delete permissions[3];

        await Role.save({
            name: 'Editor',
            permission: permissions
        });

        delete permissions[1];
        delete permissions[5];
        delete permissions[7];

        await Role.save({
            name: 'Viewer',
            permission: permissions
        });

        // const role = new Role();
        // role.name = 'Admin';
        // role.permission = permissions;



        process.exit(0);
    })
    .catch((error) => console.log(error)) 