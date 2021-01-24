import request from 'supertest'
import {app} from '../../app'



it('fails when email does not exist',async()=>{
    return request(app)
    .post('/api/users/signin')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(400)

    
})

it('fails when password is incorrect',async()=>{
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201)

    await  request(app)
    .post('/api/users/signin')
    .send({
        email: 'test@test.com',
        password: 'password1'
    })
    .expect(400)
})


it('works when password is correct',async()=>{
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201)

    await  request(app)
    .post('/api/users/signin')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(200)
})