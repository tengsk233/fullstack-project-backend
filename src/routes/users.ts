import { Router } from 'express'
import * as User from '../controllers/user'
import { authorization } from '../middlewares/authorization'
import { PERMISSIONS } from '../constants'

const router = Router()

// Restful API
// List ALL resource{user} -> GET /users
// Get ONE user -> GET /users/{userId}
// Create user -> POST /users body -> userData{}
// Update user -> PUT(PATCH) /users/{userId} body -> userData{}
// Delete user -> DELETE /users/{userId}

router.get('/', authorization([PERMISSIONS.VIEW_USERS]), User.getUsers)
router.get('/:id', authorization([PERMISSIONS.VIEW_USERS]), User.getUser)
router.post('/', authorization([PERMISSIONS.EDIT_USERS]), User.createUser)
router.put('/:id', authorization([PERMISSIONS.EDIT_USERS]), User.updateUser)
router.delete('/:id', authorization([PERMISSIONS.EDIT_USERS]), User.deleteUser)



// POST "/users/create"
// POST /users/update body - { userId, name, email, role }
// POST /users/delete body - {userId}


export default router