import { Router } from 'express'
import * as Role from '../controllers/role'
import { authorization } from '../middlewares/authorization'
import { PERMISSIONS } from '../constants'

const router = Router()

router.get('/', authorization([PERMISSIONS.VIEW_ROLES]), Role.getRoles)
router.get('/:id', authorization([PERMISSIONS.VIEW_ROLES]), Role.getRole)
router.post('/', authorization([PERMISSIONS.EDIT_ROLES]), Role.createRole)
router.put('/:id', authorization([PERMISSIONS.EDIT_ROLES]), Role.updateRole)
router.delete('/:id', authorization([PERMISSIONS.EDIT_ROLES]), Role.deleteRole)

export default router