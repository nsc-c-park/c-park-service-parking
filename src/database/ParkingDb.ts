import DbConfig from '../config/DbConfig';

export class ParkingDb extends DbConfig.bookshelf.Model<ParkingDb> {
    get tableName() {
        return 'parking';
    }
}

export default ParkingDb;
