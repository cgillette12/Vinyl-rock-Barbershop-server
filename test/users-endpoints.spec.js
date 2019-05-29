/*golbal expect request */
const knex = require('knex')
const bcrypt = require('bcryptjs')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe.only('Users Endpoints', function () {
    let db

    const { testUsers } = helpers.makeVinylFixtures();
    const testUser = testUsers[0];

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe(`POST /vinyl/users`, () => {
        context(`User Validation`, () => {
            beforeEach('insert users', () =>
                helpers.seedUsers(
                    db,
                    testUsers,
                )
            )

            const requiredFields = ['user_name', 'first_name', 'last_name', 'email', 'phone_number', 'password']

            requiredFields.forEach(field => {
                const registerAttemptBody = {
                }

                it(`responds with 400 required error when '${field}' is missing`, () => {
                    delete registerAttemptBody[field]
                    return request(app)
                        .post('/vinyl/users')
                        .send(registerAttemptBody)
                        .expect(400, {
                            error: `Missing '${field}' in request body`,
                        })
                })
            })
        })
    })
})