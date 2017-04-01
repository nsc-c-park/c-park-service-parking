"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DbConfig_1 = require("../config/DbConfig");
class ParkingDb extends DbConfig_1.default.bookshelf.Model {
    get tableName() {
        return 'parking';
    }
}
exports.ParkingDb = ParkingDb;
exports.default = ParkingDb;
