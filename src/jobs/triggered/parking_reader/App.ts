import * as Promise from 'bluebird';
import * as debug from 'debug';
import * as request from 'request';
import { parseString } from 'xml2js';
import DbConfig from '../../../config/DbConfig';
import ParkingDb from '../../../database/ParkingDb';

const log = debug('app');

const PARKING_URL = 'http://parking.descont.pl/parking.xml';

function getParkingInfo(url) {
    return new Promise((resolve, reject) => {
        request(url, (err, res, body) => {
            if (err) {
                return reject(err);
            } else if (res.statusCode !== 200) {
                err = new Error(`Unexpected status code: ${res.statusCode}`);
                err.res = res;
                return reject(err);
            } else {
                log('Parking info got');
                resolve(body);
            }
        });
    });
}

function parseParkingInfo(xml) {
    return new Promise((resolve, reject) => {
        parseString(xml, (err, result) => {
            if (err) {
                return reject(err);
            } else {
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

function saveParkingInfo(info) {
    log('Saving parking info');
    return new ParkingDb(info).save();
}

function logErr(err) {
    log(`Error: ${err}`);
}

function parkingInfoSaved(entity) {
    log('Parking info saved');
    log(entity);
    return DbConfig.destroy();
}

function dbConfigDestroyed() {
    log('Db config destroyed');
}

getParkingInfo(PARKING_URL)
    .then(parseParkingInfo)
    .then(saveParkingInfo)
    .then(parkingInfoSaved)
    .catch(logErr)
    .finally(dbConfigDestroyed);
