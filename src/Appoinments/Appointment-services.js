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
};

module.exports = AppointmentService;