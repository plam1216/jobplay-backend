import { Router } from "express";
import * as skillsCtrl from "../controllers/skills.js"
import { decodeUserFromToken } from "../middleware/auth.js";

const router = Router()

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)


export { router }