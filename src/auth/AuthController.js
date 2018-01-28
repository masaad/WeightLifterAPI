
import express from 'express'; 
import { ObjectID } from 'mongodb';
import * as jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { APIKEY as key, dbUrl } from '../config'; 
import { verifyToken } from '../auth/VerifyToken';
import { MongoClient } from 'mongodb';

let router = express.Router(); 

router.post('/register', (req, res) => {
    const hashedPassword = bcryptjs.hashSync(req.body.password, 8);
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        role: req.body.role,
        email: req.body.email, 
    };
    
    MongoClient.connect(dbUrl, (err, database) => {    
        if (err) throw `Failed to connect to database. Error: ${err}`;
        const db = database.db('weightlifter');     
        db.collection('users').insert(newUser, (err, result) => {
            if (err){
                res.status(500).send({ "error" : "An error has occurred. "  + err})
            }else{
                const token = jwt.sign({ id: result.ops[0]._id}, key, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ auth: true, token: token });
            }
        });     
    });            
});

router.post('/login', (req, res) => {
    MongoClient.connect(dbUrl, (err, database) => {    
        if (err) throw `Failed to connect to database. Error: ${err}`;
        const db = database.db('weightlifter');     
        db.collection('users').findOne({ email: req.body.email }, (err, user)=> {
            if (err)
              return res.status(500).send({ "error" : "Error: " + err});
            const pwdIsValid = bcryptjs.compareSync(req.body.password, user.password); 
    
            if (!pwdIsValid) 
                return res.status(401).send({
                    auth: false, 
                    token: null,
                });
            
            const token = jwt.sign({
                id: user._id, 
                role: user.role,
            }, key, {
                expiresIn: 86400
            }); 
    
            res.status(200).send({
                auth: true, 
                token: token
            }); 
            
        });
    });               
});


export default router;  