import { Router, Request, Response, NextFunction } from 'express';

import ParkingDb from  '../database/ParkingDb';

export class ParkingRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * GET current state of parking
     */
    public getCurrentParkingState(req: Request, res: Response, next: NextFunction) {
        ParkingDb
            .fetchAll()
            .then(function (contacts) {
                res.json({ contacts });
            }, function (err) {
                console.log(err);
            });
    }

    init() {
        this.router.get('/', this.getCurrentParkingState);
    }

}

const ParkingRoutes = new ParkingRouter();
ParkingRoutes.init();

export default ParkingRoutes.router;
