"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const DbConfig_1 = require("../config/DbConfig");
const log = debug('ParkingDb');
class ParkingDb extends DbConfig_1.default.bookshelf.Model {
    get tableName() {
        return 'parking';
    }
    getLastParkingIdAsync() {
        return new Promise((resolve, reject) => {
            DbConfig_1.default.knex(this.tableName).max('id as id').then((result) => {
                if (result.length === 1) {
                    const id = result[0].id;
                    log(`Last parking id ${id}`);
                    resolve(id);
                }
                else {
                    return reject('Parking not found');
                }
            });
        });
    }
    getParkingForIdAsync(id) {
        log(`Searching parking for id ${id}`);
        return ParkingDb.where('id', '=', id).fetchAll();
    }
}
exports.ParkingDb = ParkingDb;
exports.default = ParkingDb;
