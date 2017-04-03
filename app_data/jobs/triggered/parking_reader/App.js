"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Promise = require("bluebird");
const debug = require("debug");
const request = require("request");
const xml2js_1 = require("xml2js");
const DbConfig_1 = require("../../../config/DbConfig");
const ParkingDb_1 = require("../../../database/ParkingDb");
const log = debug('app');
const PARKING_URL = 'http://parking.descont.pl/parking.xml';
function getParkingInfoAsync(url) {
    return new Promise((resolve, reject) => {
        request(url, (err, res, body) => {
            if (err) {
                return reject(err);
            }
            else if (res.statusCode !== 200) {
                err = new Error(`Unexpected status code: ${res.statusCode}`);
                err.res = res;
                return reject(err);
            }
            else {
                log('Parking info got');
                resolve(body);
            }
        });
    });
}
function parseParkingInfoAsync(xml) {
    return new Promise((resolve, reject) => {
        xml2js_1.parseString(xml, (err, result) => {
            if (err) {
                return reject(err);
            }
            else {
                log('Parking info parsed');
                resolve({
                    date: result.ParkPollGroups.$.timestamp,
                    free: result.ParkPollGroups.Group[0].$.free,
                    total: result.ParkPollGroups.Group[0].$.spaces,
                });
            }
        });
    });
}
function saveParkingInfoAsync(info) {
    log('Saving parking info');
    return new ParkingDb_1.default(info).save();
}
function logErr(err) {
    log(`Error: ${err}`);
}
function parkingInfoSaved(entity) {
    log('Parking info saved');
    log(entity);
    return DbConfig_1.default.destroy();
}
function dbConfigDestroyed() {
    log('Db config destroyed');
}
getParkingInfoAsync(PARKING_URL)
    .then(parseParkingInfoAsync)
    .then(saveParkingInfoAsync)
    .then(parkingInfoSaved)
    .catch(logErr)
    .finally(dbConfigDestroyed);
