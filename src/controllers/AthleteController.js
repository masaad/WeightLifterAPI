import express from 'express';
import { ObjectID, MongoClient } from 'mongodb';
import * as jwt from 'jsonwebtoken';
import { dbStrings, dbUrl } from '../config';
import { verifyToken } from '../auth/VerifyToken';

let router = express.Router(); 

router.get('/', verifyToken, (req, res) => {
    res.send('verified');  
});


router.get('/details/:id', verifyToken, (req, res) => {
    const details = { '_id': new ObjectID(req.params.id) };  
    MongoClient.connect(dbStrings.dbUrl, (err, database) => {    
        if (err) throw `Failed to connect to database. Error: ${err}`;
        const db = database.db(dbStrings.dbName);
        db.collection(dbStrings.tables.athletes).findOne(details, (err, item)=> {
            if (err){
                res.send({ "error" : "Error: " + err});
            } else {
                res.send(item); 
            }
        })        
    });              
});

router.get('/find/:name', verifyToken, (req, res) => {
    const pattern = `.*${req.params.name}.*`;         
    const filter = { $or: [{ firstName: { $regex: pattern,  $options: 'i'}}, { lastName: { $regex : pattern,  $options: 'i' } }]}; 
    MongoClient.connect(dbStrings.dbUrl, (err, database) => {    
        if (err) throw `Failed to connect to database. Error: ${err}`;
        const db = database.db(dbStrings.dbName);    
        db.collection(dbStrings.tables.athletes).find(filter).toArray((err, items) => {
            if (err){
                res.send({ "error": "Error: " + err});
            } else {
                res.send(items);
            }
        });        
    });                      
})

router.post('/', verifyToken, (req, res) => { 
    const newAthlete  = {
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        DOB: req.body.DOB
    }
    MongoClient.connect(dbStrings.dbUrl, (err, database) => {    
        if (err) throw `Failed to connect to database. Error: ${err}`;
        const db = database.db(dbStrings.dbName);   
        db.collection(dbStrings.tables.athletes).insert(newAthlete, (err, result) => {
            if (err){
                res.send({ "error" : "An error has occurred. "  + err})
            }else{
                res.send(result.ops[0]._id);
            }
        });               
    });         
   
});

router.post('/update/:id', verifyToken, (req, res) => {  
    MongoClient.connect(dbStrings.dbUrl, (err, database) => {    
        if (err) throw `Failed to connect to database. Error: ${err}`;
        const db = database.db(dbStrings.dbName);           
        db.collection(dbStrings.tables.athletes).updateOne({ '_id': new ObjectID(req.params.id)}, { $set: req.body }, (err, item) => {
            if (err) {
                res.send({ "error" : "An error has occurred. "  + err})
            } else {                 
                res.send(item)
            };
        });       
    });                                      
});

router.delete('/delete/:id', verifyToken, (req, res) => {
    const details = { '_id' : new ObjectID(req.params.id) }; 
    MongoClient.connect(dbStrings.dbUrl, (err, database) => {    
        if (err) throw `Failed to connect to database. Error: ${err}`;
        const db = database.db(dbStrings.dbName); 
        db.collection(dbStrings.tables.athletes).remove(details, (err, item) => {
            if (err) {
                res.send({ "error" : "Error: " + err })
            } else { 
                res.send('Athlete ' + req.params.id + ' deleted!'); 
            }
        });          
    });             
});

export default router; 
