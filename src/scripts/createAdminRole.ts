import { prisma } from "../client";

const main = async () => {
    await prisma.role.create({
        data: {
            name: 'Admin',
            permissions: {
                connect: [1, 2, 3, 4, 5, 6, 7, 8].map(id => ({ id }))
            }
        },
        include: {
            permissions: true
        }
    })
}
main()