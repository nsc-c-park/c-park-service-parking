"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ParkingDb_1 = require("../database/ParkingDb");
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
exports.ParkingRouter = ParkingRouter;
const ParkingRoutes = new ParkingRouter();
ParkingRoutes.init();
exports.default = ParkingRoutes.router;
