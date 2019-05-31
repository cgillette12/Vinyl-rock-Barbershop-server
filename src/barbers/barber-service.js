'use strict';

const xss = require('xss');

const BarberService = {
  getAllBarbers(db){
    return db('barbers')
      .select('*');
        
  },
  getById(knex,id){
    return knex
      .from('barbers')
      .first('*')
      .where('id',id);
  },

  serializeBarber(barber){
    return {
      id: barber.id,
      first_name:xss(barber.first_name)
    };
  }
};