const db = require('../data/dbConfig.js');

const Users = require('./usersModel.js');

beforeEach(async () => {
    await db('users').truncate();
})

it('its running with the correct db', () => {
    expect(process.env.DB_ENV).toBe('testing')
})

describe('usersModel', () => {
    
    describe("insert function", () => {

        it('inserts', async () => {

            let records

            records = await db('users')
            expect(records).toHaveLength(0)
            await Users.insert({ name: 'Broski' })

            records = await db('users')
            expect(records).toHaveLength(1)

            await Users.insert({ name: 'Broseph' })

            records = await db('users')
            expect(records).toHaveLength(2)
        })

        it('resolves the newly inserted user', async () => {
            expect(await Users.insert({ name: 'Bro' }))
                .toEqual({ id: 1, name: 'Bro' })
        })
    })
})