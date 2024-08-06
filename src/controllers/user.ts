import { Request, Response } from 'express'
import { prisma } from '../client'
import { hashSync } from 'bcryptjs'

export const getUsers = async (req: Request, res: Response) => {

    const users = await prisma.user.findMany()

    return res.json(users)
}

export const getUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    if (!user) {
        return res.status(404).send('not found')
    }
    return res.json(user)
}

export const createUser = async (req: Request, res: Response) => {
    const { email, name, roleId } = req.body;

    const user = await prisma.user.create({
        data: {
            email: email,
            name: name,
            role: {
                connect: {
                    id: roleId
                }
            },
            Password: {
                create: {
                    hash: hashSync('123456', 10)
                }
            }
        }
    })

    return res.json(user)
}

export const updateUser = async (req: Request, res: Response) => {
    const { email, name, roleId } = req.body;
    const id = Number(req.params.id)
    const user = await prisma.user.update({
        data: {
            email,
            name,
            roleId
        },
        where: {
            id: id
        }
    })
    return res.json(user)

}

export const deleteUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    await prisma.user.delete({
        where: {
            id: id
        },
        include: {
            
        }
    })
    return res.send(`Success delete user ${id}`)
}