import { prisma } from "../client";

const main = async () => {
    await prisma.permission.createMany({
        data: [
            { id: 1, name: 'view_users' },
            { id: 2, name: 'edit_users' },
            { id: 3, name: 'view_roles' },
            { id: 4, name: 'edit_roles' },
            { id: 5, name: 'view_products' },
            { id: 6, name: 'edit_products' },
            { id: 7, name: 'view_orders' },
            { id: 8, name: 'edit_orders' },
        ],
        skipDuplicates: true
    })
}
main()