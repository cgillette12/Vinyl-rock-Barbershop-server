'use strict';
const express = require('express');
const path = require('path');
const UsersService = require('./user-service');

const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter 
  .post('/', jsonBodyParser, (req,res,next)=>{
    const {user_name,first_name,last_name,email,phone_number,password} = req.body;
    for (const field of ['user_name', 'first_name', 'last_name', 'email', 'phone_number', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        });
  });