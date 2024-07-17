import express from "express"

import { followUser } from "../controllers/auth.contoller.js"

import { logout, signin, signup  } from "../controllers/auth.contoller.js"
import protectRoute from "../middlewares/protectRoute.js"


const router = express.Router()


router.post("/signin", signin)

router.post("/signup", signup)

router.post("/follow/:id", protectRoute, followUser)


router.post("/logout", logout)

export default router