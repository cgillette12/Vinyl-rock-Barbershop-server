'use strict';
const AppointmentService = {
  getAppointments(db) {
    return db
      .select('*')
      .from('Appointments');

  },
  getById(knex, id) {
    return knex
      .from('Appointments')
      .first('*')
      .where('id', id);
  },
  insertUser(db, User) {
    return db
      .insert(User)
      .into('Appointments')
      .returning('*')
      .then(([user]) => user);
  },
};

module.exports = AppointmentService;