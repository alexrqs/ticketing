import request from 'supertest'
import { app } from '../../app'

interface ICreateTicket {
  title: string;
  price: number;
}

const createTicket = ({ title, price }: ICreateTicket) => {
  return request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title, price})
}

it('can fetch a listof tickets', async () => {
  await createTicket({ title: 'title1', price: 20 })
  await createTicket({ title: 'title2', price: 20 })
  await createTicket({ title: 'title3', price: 20 })

  const response = await request(app)
    .get('/api/tickets')
    .send()
    .expect(200)

  expect(response.body.length).toEqual(3)
})
