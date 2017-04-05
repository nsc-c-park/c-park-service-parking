import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';

import ParkingRouter from './routes/ParkingRouter';
import WidgetRouter from './routes/WidgetRouter';

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        this.express.use('/api/v1/parking', ParkingRouter);
        this.express.use('/widget', WidgetRouter);
    }
}

export default new App().express;
