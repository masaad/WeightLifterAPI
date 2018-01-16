const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const url = require('url');
import { setRoutes }  from '../src/routes'
import * as config  from '../src/config';

const app = express(); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

MongoClient.connect(config.dbUrl, (err, database) => {    
    if (err) return console.log(err);
    const athletesDb = database.db('weightlifter');
    setRoutes(app, athletesDb); 
})


console.log('Starting server...')
app.listen(config.portNo, () => {
  console.log(`Server is running at http://localhost:${config.portNo}`);
})

module.exports = app; 
