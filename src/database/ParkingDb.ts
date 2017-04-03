import * as debug from 'debug';
import DbConfig from '../config/DbConfig';

const log = debug('ParkingDb');

export class ParkingDb extends DbConfig.bookshelf.Model<ParkingDb> {
    get tableName() {
        return 'parking';
    }
    public getLastParkingIdAsync() {
        return new Promise((resolve, reject) => {
            DbConfig.knex(this.tableName).max('id as id').then((result) => {
                if (result.length === 1) {
                    const id = result[0].id;
                    log(`Last parking id ${id}`);
                    resolve(id);
                } else {
                    return reject('Parking not found');
                }
            });
        });
    }

    public getParkingForIdAsync(id) {
        log(`Searching parking for id ${id}`);
        return ParkingDb.where<ParkingDb>('id', '=', id).fetchAll();
    }
}

export default ParkingDb;
