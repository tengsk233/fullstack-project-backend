import { Request, Response } from 'express'
import { prisma } from '../client'

export const getPermissions = async (req: Request, res: Response) => {

    const permissions = await prisma.permission.findMany()

    return res.json(permissions)
}