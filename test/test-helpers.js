'use strict';
const bcrypt = require('bcryptjs')

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'user_name-1',
      password: 'password-1',
      first_name: 'first_name-1',
      last_name: 'last_name-1',
      email: 'email-1',
      phone_number: 1,
    },
    {
      id: 2,
      user_name: 'user_name-2',
      password: 'password-2',
      first_name: 'first_name-2',
      last_name: 'last_name-2',
      email: 'email-2',
      phone_number: 2,
    },
    {
      id: 3,
      user_name: 'user_name-3',
      password: 'password-3',
      first_name: 'first_name-3',
      last_name: 'last_name-3',
      email: 'email-3',
      phone_number: 3,
    },
    {
      id: 4,
      user_name: 'user_name-4',
      password: 'password-4',
      first_name: 'first_name-4',
      last_name: 'last_name-4',
      email: 'email-4',
      phone_number: '-4'
    },
  ];
}

function cleanTables(db){
  return db.raw(
    `TRUNCATE
        vinyl_users
        RESTART IDENTITY CASCADE`
  );
}
function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1)
    }))
    return db.into('vinyl_users').insert(preppedUsers)
        .then(() => {
            return db.raw(
                `SELECT setval('vinyl_users_id_seq', ?)`,
                [users[users.length - 1].id]
            )
          }
        )
}

function makeVinylFixtures() {
  const testUsers = makeUsersArray();
  return { testUsers };
}

module.exports = {
  makeUsersArray,
  cleanTables,
  seedUsers,
  makeVinylFixtures,

};