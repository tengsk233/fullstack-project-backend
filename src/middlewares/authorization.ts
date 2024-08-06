import { Request, Response, NextFunction } from 'express'
import { prisma } from '../client';

export const authorization = (targetPermissions: number[]) => {
    return async (req: any, res: Response, next: NextFunction) => {
        const roleId = req.user.roleId;

        const userPermissions = await prisma.role.findUnique({
            where: {
                id: roleId
            }
        }).permissions()
        if(!userPermissions) {
            return res.status(403).send('Unauthorized')
        }
        const userPermissionIds = userPermissions.map(p => p.id)

        if(!userPermissionIds.some(p => targetPermissions.includes(p))) {
            return res.status(403).send('Unauthorized')
        }

        next()
    }
}

// export const authorization = async (req: any, res: Response, next: NextFunction) => {
//     console.log(req.user)
//     // if(req.user)
//     const roleId = req.user.roleId;

//     const userPermissions = await prisma.role.findUnique({
//         where: {
//             id: roleId
//         }
//     }).permissions()
//     console.log(userPermissions)

//     next()
// }