'use strict';
const AppointmentService = {
  getAppointments(db) {
    return db
      .from('appointments AS app')
      .select(
        'app.time',
        'barbers.first_name',
        'services.type'
      )
      .leftJoin(
        'barbers',
        'app.barber_id',
        'barbers.id'
      )
      .leftJoin(
        'services',
        'app.services_id',
        'services.id'
      );

  },
  getById(db, id) {
    return db
      .from('appointments AS app')
      .select(
        'app.id',
        'app.time',
        'app.date_created',
        'app.users_id',
        'barbers.first_name',
        'services.type'
      )
      .leftJoin(
        'barbers',
        'app.barber_id',
        'barbers.id' 
      )
      .leftJoin(
        'services',
        'app.services_id',
        'services.id'
      )
      .first()
      .where('app.id', id);
  },
  insertAppointment(db, User) {
    return db
      .insert(User)
      .into('appointments')
      .returning('*')
      .then(([user]) => user);
  },
};

module.exports = AppointmentService;