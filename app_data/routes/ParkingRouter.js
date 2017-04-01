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
        ParkingDb_1.default
            .fetchAll()
            .then((contacts) => {
            res.json({ contacts });
        }, (err) => {
            log(err);
        });
    }
    init() {
        this.router.get('/', this.getCurrentParkingState);
    }
}
exports.ParkingRouter = ParkingRouter;
const ParkingRoutes = new ParkingRouter();
ParkingRoutes.init();
exports.default = ParkingRoutes.router;
