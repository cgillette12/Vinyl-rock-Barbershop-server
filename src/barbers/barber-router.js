'use strict';
const express = require('express');
const BarberService= require('./barber-service');
const barberRouter = express.Router();

barberRouter 
    .route('/')
    .get((req,res,next)=>{
        BarberService.GetAllBarbers(req.app.get('db'))
        .then(things => {
            res.json()
        })
    })