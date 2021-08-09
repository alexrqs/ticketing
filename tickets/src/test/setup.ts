import { sign } from 'jsonwebtoken';
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../app'

declare global {
  var signin: () => string[];
}

let mongo: any
beforeAll(async () => {
  process.env.JWT_KEY = 'asdf'
  mongo = await MongoMemoryServer.create()
  const mongoUri = mongo.getUri()

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()

  for (const collection of collections) {
    await collection.deleteMany({})
  }

})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})

global.signin = () => {
  // build JWT payload { id, email }
  const payload = {
    id: mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com'
  }
  // create a JWT
  const token = sign(payload, process.env.JWT_KEY!)
  // build session obj
  const session = { jwt: token }
  // turn it into json
  const sessionJSON = JSON.stringify(session)
  // encode json to base 64
  const base64 = Buffer.from(sessionJSON).toString('base64')
  // return a string
  return [`express:sess=${base64}`]
}
