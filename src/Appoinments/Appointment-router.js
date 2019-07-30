'use strict';
const express = require('express');
const path = require('path');
const AppointmentService = require('../Appoinments/Appointment-services');
const { requireAuth } = require('../middleware/jwt-auth');


const AppointmentRouter = express.Router();
const jsonBodyParser = express.json();

AppointmentRouter
  .route('/')
  .get(requireAuth, (req, res, next) => {
    AppointmentService.getAppointments(req.app.get('db'), req.user.id)
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

  })
  .delete((req, res, next) => {
    AppointmentService.deleteAppointment(
      req.app.get('db'),
      req.params.Appointment_id
    )
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });
AppointmentRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { time, services_id, barber_id } = req.body;

    const newAppointment = { time, services_id, barber_id };

    for (const [key, value] of Object.entries(newAppointment))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    newAppointment.users_id = req.user.id;

    AppointmentService.insertAppointment(
      req.app.get('db'),
      newAppointment
    )
      .then(appointment => {

        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${appointment.id}`))
          .json(appointment);
      })
      .catch(next);
  });


module.exports = AppointmentRouter;
