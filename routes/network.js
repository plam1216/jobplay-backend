import { Router } from 'express'
import * as networkCtrl from '../controllers/network.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, networkCtrl.index)
router.post('/', checkAuth, networkCtrl.create)
router.put('/:id', checkAuth, networkCtrl.update)
router.get('/:id', checkAuth, networkCtrl.show)



export { router }