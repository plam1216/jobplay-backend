import { Router } from "express";
import * as badgeCtrl from "../controllers/badge.js"
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router()

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, badgeCtrl.index)
router.post('/', checkAuth, badgeCtrl.addBadge)

export { router }