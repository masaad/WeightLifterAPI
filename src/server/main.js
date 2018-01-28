const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const url = require('url');
const helmet = require('helmet');

import { portNo }  from '../config';
import authController from '../auth/AuthController';
import * as controllers from '../controllers'

const app = express(); 
//const auth = new authController(); 

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/auth', authController);
app.use('/api/athletes', controllers.athleteController);


app.listen(portNo, () => {
  console.log(`Server is running at http://localhost:${portNo}`);
})

module.exports = app; 
