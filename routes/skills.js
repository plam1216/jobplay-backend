import { Router } from "express";
import * as skillsCtrl from "../controllers/skills.js"
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router()

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, skillsCtrl.createSkill)
router.get('/', checkAuth, skillsCtrl.index)

export { router }