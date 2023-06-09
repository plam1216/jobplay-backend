import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, profilesCtrl.index)
router.get('/id/:id', checkAuth, profilesCtrl.getProfile)
router.put("/id/:id", profilesCtrl.updateProfile);
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)

export { router }
