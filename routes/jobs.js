import { Router } from 'express'
import * as jobsCtrl from '../controllers/jobs.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, jobsCtrl.index)
router.post('/', checkAuth, jobsCtrl.createJob)
router.delete('/:id', checkAuth, jobsCtrl.deleteJob)
router.put('/:id', checkAuth, jobsCtrl.updateJob)

export { router }
