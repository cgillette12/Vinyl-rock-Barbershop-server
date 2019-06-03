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
        'app.user_id',
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
        'vinyl_users AS usr',
        'app.id',
        'usr.id',
        'services_id',
        'barber_id'
      )
      .first('*')
      .where('id', id);
  },
  insertUser(db, User) {
    return db
      .insert(User)
      .into('appointments')
      .returning('*')
      .then(([user]) => user);
  },
};

module.exports = AppointmentService;