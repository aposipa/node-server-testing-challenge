const db = require('../data/dbConfig.js');
const server = require('./server.js');

const request = require('supertest');

// beforeEach(async () => {
//     await db('users').truncate();
// })

it("is running with the correct db", () => {
    expect(process.env.DB_ENV).toBe('testing')
})

describe('server.js', () => {
    describe('[GET] /', () => {
        it('runs correctly', () => {
            return request(server).get('/')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect('Content-Length', '12')
            .expect({ api: "up" })
        })
    })

    describe('[GET] /users', () => { 
        it('works correctly', () => {
            return request(server).get('/users')
            .then(res => {
                expect(res.statusCode).toBe(200)
            })
        })
    })

    describe('[POST] /users', () => {
        it('posts correctly', () => {
            return request(server)
            .post('/users')
            .send({ name: "Brocifer" })
            
            .then(res => {
                // console.log("LOOK HERE", res.body, res.statusCode)
                expect(res.body.createUser.name).toEqual("Brocifer");

            })
        })
        it("posts correctly with a status code", () => {
            return request(server)
            .post('/users')
            .send({ name: "Brodo" })
            .then(res => {
                expect(res.status).toBe(201);
            })
        })
    })

    describe('[DELETE] /users/:id', () => {
        it('deletes a user with the passed ID', () => {
            return request(server)
            .delete('/users/1')
            .then(res => {
                console.log("LOOK RIGHT HERE", res.status)
                expect(res.status).toBe(200);
            })
        })

        it('deletes the item from the db', async () => {

            await request(server).delete('/1')
                .then(res => {

                })

            const deleted = await db('users').where({ id: 1 })
            expect(deleted).toHaveLength(0)

        })
    })

})

// describe('[POST] /users', () => {
    //     it('posts correctly', () => {
    //         return request(server)
    //         .post('/users')
    //         .then(res => {
    //             console.log("LOOKY HERE", res.statusCode)
    //             .expect(res.statusCode).toBe(201)
    //         })            
    //     })
    // })
// test for status, test for whats being posted