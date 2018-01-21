const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const url = require('url');
const helmet = require('helmet');

import { setRoutes }  from '../routes'
import { portNo }  from '../config';
import router from '../auth/AuthController'

const app = express(); 
//const auth = new authController(); 

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/auth', router);


app.listen(portNo, () => {
  console.log(`Server is running at http://localhost:${portNo}`);
})

module.exports = app; 
