import { Request, Response } from 'express'
import { prisma } from '../client'

interface GetRoleParams {
    id: string;
}

interface CreateRoleBody {
    name: string;
    permissions: number[]
}

interface UpdateRoleParams {
    id: string
}

interface UpdateRoleBody {
    name: string;
    permissions: number[]
}

interface DeleteRoleParams {
    id: string
}

export const getRoles = async (req: Request, res: Response) => {

    const roles = await prisma.role.findMany()

    return res.json(roles)
}

export const getRole = async (req: Request<GetRoleParams>, res: Response) => {
    const id = req.params.id

    const role = await prisma.role.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            permissions: true
        }
    })
    if (!role) {
        return res.status(404).send('not found')
    }
    return res.json(role)
}

export const createRole = async (req: Request<any, any, CreateRoleBody>, res: Response) => {
    const { name, permissions } = req.body
    const role = await prisma.role.create({
        data: {
            name: name,
            permissions: {
                connect: permissions.map(id => ({ id }))
            }
        },
        include: {
            permissions: true
        }
    })
    return res.json(role)
}

export const updateRole = async (req: Request<UpdateRoleParams, any, UpdateRoleBody>, res: Response) => {
    const { id } = req.params
    const { name, permissions } = req.body

    const role = await prisma.role.update({
        where: {
            id: Number(id)
        },
        data: {
            name: name,
            permissions: {
                set: permissions.map(id => ({ id }))
            }
        },
        include: {
            permissions: true
        }
    })
    return res.json(role)
}

export const deleteRole = async (req: Request<DeleteRoleParams>, res: Response) => {
    const id = Number(req.params.id)
    await prisma.role.delete({
        where: {
            id: id
        }
    })
    return res.send(`Success delete role ${id}`)
}