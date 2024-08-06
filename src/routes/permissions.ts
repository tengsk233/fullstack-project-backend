import { Router } from 'express'
import * as Permission from '../controllers/permission'

const router = Router()

router.get('/', Permission.getPermissions)

export default router