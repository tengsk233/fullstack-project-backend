import { Request, Response } from "express";
import { prisma } from "../client";
import { compareSync, hashSync } from 'bcryptjs'
import { sign } from 'jsonwebtoken'


interface LoginBody {
    email: string;
    password: string;
}

interface UpdatePasswordBody {
    password: string,
}

export async function login(req: Request<any, any, LoginBody>, res: Response) {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
        where: {
            email: email
        },
        include: {
            role: true,
            Password: true
        }
    })

    if (!user || !user.Password) {
        return res.status(404).send('No user found')
    }

    if (!compareSync(password, user.Password.hash)) {
        return res.status(400).send('Wrong password')
    }

    const userData = {
        id: user.id,
        name: user.name,
        roleId: user.roleId,
        email: user.email
    }

    const token = sign(userData, 'private_secret', {
        expiresIn: '30d'
    })

    const userResponse = {
        ...userData,
        token
    }

    // const userResponse = {
    //     id: user.id,
    //     name: user.name,
    //     roleId: user.roleId,
    //     token: token
    // }

    return res.json(userResponse)
}

export const updatePassword = async (req: Request<any, any, UpdatePasswordBody>, res: Response) => {
    const userId = (req as any).user.id as number
    const { password } = req.body

    await prisma.password.update({
        where: {
            userId: userId
        },
        data: {
            hash: hashSync(password, 10)
        }
    })

    return res.status(200).send('Update success')
}