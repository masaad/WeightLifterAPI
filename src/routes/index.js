

import * as athleteRoutes from './AthleteRoutes';

export const setRoutes = (app, db) => {
    athleteRoutes.setGetAllAthleteRoute(app, db); 
    athleteRoutes.setGetAthleteByIdRoute(app, db); 
    athleteRoutes.setGetAthleteByNameRoute(app, db);
    athleteRoutes.setPostAthleteRoute(app, db);
    athleteRoutes.setUpdateAthleteRoute(app, db); 
}
