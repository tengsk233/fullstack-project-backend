import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

const NO_AUTH_ROUTES = ['/auth/login']

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    if(NO_AUTH_ROUTES.includes(req.path)) {
        return next()
    }
    const tokenHeader = req.header('Authorization')
    if (!tokenHeader) {
        return res.status(403).send('No auth token')
    }

    const token = tokenHeader.split(' ')[1]

    verify(token, 'private_secret', (err, payload) => {
        if (err) {
            return res.status(403).send('Failed to authenticate')
        }
        (req as any).user = payload
        next()
    })
}