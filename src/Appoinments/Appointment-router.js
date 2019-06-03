'use strict';
const express = require('express');
const AppointmentService = require('./Appointment-service');
const { requireAuth } = require('../middleware/jwt-auth');
const AppointmentRouter = express.Router();
AppointmentRouter
  .route('/')
  .get((req, res, next) => {
    AppointmentService.getAllAppointments(req.app.get('db'))
      .then(Appointments => {
        res.json(Appointments);
      })
      .catch(next);
  });
AppointmentRouter
  .route('/:Appointment_id')
  .all(requireAuth)
  .get((req, res) => {
    AppointmentService.getById(req.app.get('db'), req.params.Appointment_id)
      .then(Appointment => {
        res.json(Appointment);
      });

  });