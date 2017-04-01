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
        ParkingDb
            .fetchAll()
            .then((contacts) => {
                res.json({ contacts });
            }, (err) => {
                log(err);
            });
    }

    public init() {
        this.router.get('/', this.getCurrentParkingState);
    }

}

const ParkingRoutes = new ParkingRouter();
ParkingRoutes.init();

export default ParkingRoutes.router;
