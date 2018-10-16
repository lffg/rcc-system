'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')

Factory.blueprint('App/Models/Post', (faker) => {
  return {
    title: faker.sentence({ words: 5 }),
    description: faker.sentence({ words: 10 }),
    body: faker.paragraph({ sentences: 15 }),
    user_id: faker.integer({ min: 1, max: 3 })
  }
})

Factory.blueprint('App/Models/User', (faker) => {
  return {
    username: faker.username(),
    state: 'ACTIVE',
    password: faker.password(),
    email: faker.email()
  }
})
