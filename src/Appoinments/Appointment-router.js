'use strict';
const express = require('express');
const path = require('path');
const AppointmentService = require('./Appointment-service');
const { requireAuth } = require('../middleware/jwt-auth');


const AppointmentRouter = express.Router();
const jsonBodyParser = express.json();

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

AppointmentRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { time, user_id, service_id, barber_id } = req.body;
    const newAppointment = { time, user_id, service_id, barber_id };

    for (const [key, value] of Object.entries(newAppointment))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    newAppointment.user_id = req.user_id;

    AppointmentService.insertAppointment(
      req.app.get('db'),
      newAppointment
    )
      .then(appointment=> {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${appointment.id}`))
          .json(AppointmentService.serializeUser(appointment));
      })
      .catch(next);
  });

module.exports = AppointmentRouter;
