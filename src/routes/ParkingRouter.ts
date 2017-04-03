import * as debug from 'debug';
import { NextFunction, Request, Response, Router } from 'express';
import ParkingDb from '../database/ParkingDb';

const log = debug('app');

export class ParkingRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * GET current state of parking
     */
    public getCurrentParkingState(req: Request, res: Response, next: NextFunction) {
        const parkingDb = new ParkingDb();
        parkingDb.getLastParkingIdAsync()
            .then(parkingDb.getParkingForIdAsync)
            .then((parking) => {
                res.json({ parking });
            }).catch((err) => {
                res.send(err);
            });
    }

    public init() {
        this.router.get('/', this.getCurrentParkingState);
    }

}

const parkingRoute = new ParkingRouter();
parkingRoute.init();

export default parkingRoute.router;
