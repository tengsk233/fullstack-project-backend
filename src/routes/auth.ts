import { Router } from 'express'
import * as Auth from '../controllers/auth'

const router = Router()

router.post('/login', Auth.login)
router.post('/update-password', Auth.updatePassword)

export default router