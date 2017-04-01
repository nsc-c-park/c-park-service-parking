"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const Promise = require("bluebird");
const xml2js_1 = require("xml2js");
const ParkingDb_1 = require("../../../database/ParkingDb");
const DbConfig_1 = require("../../../config/DbConfig");
const PARKING_URL = 'http://parking.descont.pl/parking.xml';
function getParkingInfo(url) {
    return new Promise(function (resolve, reject) {
        request(url, function (err, res, body) {
            if (err) {
                return reject(err);
            }
            else if (res.statusCode !== 200) {
                err = new Error(`Unexpected status code: ${res.statusCode}`);
                err.res = res;
                return reject(err);
            }
            else {
                console.log('Parking info got');
                resolve(body);
            }
        });
    });
}
function parseParkingInfo(xml) {
    return new Promise(function (resolve, reject) {
        xml2js_1.parseString(xml, function (err, result) {
            if (err) {
                return reject(err);
            }
            else {
                console.log('Parking info parsed');
                resolve({
                    date: result.ParkPollGroups['$'].timestamp,
                    total: result.ParkPollGroups.Group[0]['$'].spaces,
                    free: result.ParkPollGroups.Group[0]['$'].free,
                });
            }
        });
    });
}
function saveParkingInfo(info) {
    console.log('Saving parking info');
    return new ParkingDb_1.default(info).save();
}
function logErr(err) {
    console.log(`Error: ${err}`);
}
function parkingInfoSaved(entity) {
    console.log('Parking info saved');
    console.log(entity);
    return DbConfig_1.default.destroy();
}
function dbConfigDestroyed() {
    console.log('Db config destroyed');
}
getParkingInfo(PARKING_URL)
    .then(parseParkingInfo)
    .then(saveParkingInfo)
    .then(parkingInfoSaved)
    .catch(logErr)
    .finally(dbConfigDestroyed);
