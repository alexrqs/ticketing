import express from 'express'
import { json } from 'body-parser'
import 'express-async-errors'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()

app.set('trust proxy', true)
app.use(json())
app.use(cookieSession({
  signed: false,
  // goes over HTTPS
  secure: true,
}))

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })

  } catch (error) {
    console.log(error);

  }

  app.listen(3000, () => {
    console.log('Listening 3000 !!');
  })
}

start()

