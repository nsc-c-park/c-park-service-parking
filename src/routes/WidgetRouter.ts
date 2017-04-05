import * as debug from 'debug';
import { NextFunction, Request, Response, Router } from 'express';
import ParkingDb from '../database/ParkingDb';

const log = debug('app');

export class WidgetRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * GET current state of parking
     */
    public getWidget(req: Request, res: Response, next: NextFunction) {
        const parkingDb = new ParkingDb();
        parkingDb.getLastParkingIdAsync()
            .then(parkingDb.getParkingForIdAsync)
            .then((parking: { models }) => {
                const free = parking.models[0].attributes.free;
                let result;
                if (free > 200) {
                    result = `#00ff00 ${free}`;
                } else if (free > 100) {
                    result = `#0000ff ${free}`;
                } else {
                    result = `#ff0000 ${free}`;
                }
                res.send(result);
            }).catch((err) => {
                res.send(err);
            });
    }

    public init() {
        this.router.get('/', this.getWidget);
    }

}

const widgetRoute = new WidgetRouter();
widgetRoute.init();

export default widgetRoute.router;
