import * as jwt from 'jsonwebtoken'; 
import { APIKEY as key } from '../config';

export const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token']; 
    if (!token)
        return res.status(403).send({
            auth: false,
            message: 'No token provided.',
        });
    
    jwt.verify(token, key, (err, decode) => {
        if (err)
            return res.status(500).send({
                auth: false, 
                message: 'Failed to authenticate token.'
            });
        res.role = decode.role;
        next(); 
    }); 
}