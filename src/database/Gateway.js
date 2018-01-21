
import { dbUrl } from '../config';

export const getWeightLifterDb = () => {
    let db = {};
    MongoClient.connect(dbUrl, (err, database) => {    
        if (err) throw `Failed to connect to database. Error: ${err}`;
        db = database.db('weightlifter');        
    });    
}