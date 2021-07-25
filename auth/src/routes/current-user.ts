import express from 'express'
import { verify } from 'jsonwebtoken'
import { currentUser } from '../middlewares/current-user'

const router = express.Router()

router.get('/api/users/currentUser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null })
})

export { router as currentUserRouter }
