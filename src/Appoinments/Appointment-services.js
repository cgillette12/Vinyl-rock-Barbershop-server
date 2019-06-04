'use strict';
const AppointmentService = {
  getAppointments(db) {
    return db
      .select('*')
      .from('appointments');

  },
  getById(db, id) {
    return db
      .from('appointments AS app')
      .select(
        'app.id',
        'app.time',
        'app.date_created',
        'app.barber_id',
        'app.services_id',
        'app.users_id',
        db.raw(`json_strip_nulls(
            row_to_json(
                SELECT tmp FROM (
                    SELECT 
                    usr.id,
                    usr.user_name
                )tmp)
            )
        )AS "user"`
        )
      )
      .leftJoin(
        'app.id',
        'users_id',
        'services_id',
        'barber_id'
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