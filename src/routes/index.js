

import * as athleteRoutes from './AthleteRoutes';
// import { authController } from '../auth/AuthController';

export const setRoutes = (app, db) => {
    // const auth = new authController(app, db); 
    // auth.registerNewUser(); 
    athleteRoutes.setGetAllAthleteRoute(app, db); 
    athleteRoutes.setGetAthleteByIdRoute(app, db); 
    athleteRoutes.setGetAthleteByNameRoute(app, db);
    athleteRoutes.setPostAthleteRoute(app, db);
    athleteRoutes.setUpdateAthleteRoute(app, db); 
}
