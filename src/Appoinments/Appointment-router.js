'use strict';
const express = require('express');
const path = require('path');
const AppointmentService = require('../Appoinments/Appointment-services');
const { requireAuth } = require('../middleware/jwt-auth');


const AppointmentRouter = express.Router();
const jsonBodyParser = express.json();

AppointmentRouter
  .route('/')
  .get((req, res, next) => {
    AppointmentService.getAppointments(req.app.get('db'))
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
    const { time, users_id, services_id , barber_id } = req.body;
   
    const newAppointment = { time, users_id, services_id , barber_id };

    for (const [key, value] of Object.entries(newAppointment))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    newAppointment.users_id = req.users_id;

    AppointmentService.insertAppointment(
      req.app.get('db'),
      newAppointment
    )
      .then(appointment => {
        console.log(appointment);
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${appointment.id}`))
          .json(appointment);
      })
      .catch(next);
  });

module.exports = AppointmentRouter;
