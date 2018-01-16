
import { ObjectID } from 'mongodb';

export const setGetAllAthleteRoute = (app, db) => {
    app.get('/athletes', (req, res) => {
        res.send('hello');
    })
};

export const setGetAthleteByIdRoute = (app, db) => {
    app.get('/athlete/details/:id', (req, res) => {
        const details = { '_id': new ObjectID(req.params.id) };         
        db.collection('athletes').findOne(details, (err, item)=> {
            if (err){
                res.send({ "error" : "Error: " + err});
            } else {
                res.send(item); 
            }
        })        
    })
};

export const setGetAthleteByNameRoute = (app, db) => {
    app.get('/athletes/find/:name', (req, res) => {
        const pattern = `.*${req.params.name}.*`;         
        const filter = { $or: [{ firstName: { $regex: pattern,  $options: 'i'}}, { lastName: { $regex : pattern,  $options: 'i' } }]};        
        db.collection('athletes').find(filter).toArray((err, items) => {
            if (err){
                res.send({ "error": "Error: " + err});
            } else {
                res.send(items);
            }
        }); 
    })
}

export const setPostAthleteRoute = (app, db) => {
    app.post('/athletes', (req, res) => { 
        const newAthlete  = {
            firstName: req.body.firstName, 
            lastName: req.body.lastName, 
            DOB: req.body.DOB
        }
        db.collection('athletes').insert(newAthlete, (err, result) => {
            if (err){
                res.send({ "error" : "An error has occurred. "  + err})
            }else{
                res.send(result.ops[0]._id);
            }
        });       
    })
};

export const setUpdateAthleteRoute = (app, db) => {
    app.post('/athletes/update/:id', (req, res) => {        
        db.collection('athletes').updateOne({ '_id': new ObjectID(req.params.id)}, { $set: req.body }, (err, item) => {
            if (err) {
                res.send({ "error" : "An error has occurred. "  + err})
            } else {                 
                res.send(item)
            };
        });
        
        
          
    })
};

export const setDeleteAthleteRoute = (app, db) => {
    app.delete('/athletes/delete/:id', (req, res) => {
        const details = { '_id' : new ObjectID(req.params.id) }; 
        db.collection('athletes').remove(details, (err, item) => {
            if (err) {
                res.send({ "error" : "Error: " + err })
            } else { 
                res.send('Athlete ' + req.params.id + ' deleted!'); 
            }
        });
    })
}