"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const express_1 = require("express");
const ParkingDb_1 = require("../database/ParkingDb");
const log = debug('app');
class ParkingRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET current state of parking
     */
    getCurrentParkingState(req, res, next) {
        const parkingDb = new ParkingDb_1.default();
        parkingDb.getLastParkingIdAsync()
            .then(parkingDb.getParkingForIdAsync)
            .then((parking) => {
            res.json({ parking });
        }).catch((err) => {
            res.send(err);
        });
    }
    init() {
        this.router.get('/', this.getCurrentParkingState);
    }
}
exports.ParkingRouter = ParkingRouter;
const parkingRoute = new ParkingRouter();
parkingRoute.init();
exports.default = parkingRoute.router;
