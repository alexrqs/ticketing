import express from 'express'
import { verify } from 'jsonwebtoken'

const router = express.Router()

router.get('/api/users/currentUser', (req, res) => {
  if (!req.session?.jwt) {
    return res.send({ currentUser: null })
  }

  try {
    const payload = verify(req.session.jwt, process.env.JWT_KEY!)

    res.send({ currentUser: payload })
  } catch (error) {
    res.send({ currentUser: null })
  }
})

export { router as currentUserRouter }
