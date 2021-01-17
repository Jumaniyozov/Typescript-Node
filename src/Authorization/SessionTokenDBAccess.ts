import * as Nedb from 'nedb';
import {SessionToken} from "../Server/Model";

export class SessionTokenDBAccess {

    private nedb: Nedb;

    constructor() {
        this.nedb = new Nedb('database/SessionToken.db');
        this.nedb.loadDatabase();
    }

    public async storeSessionToken(token: SessionToken): Promise<void> {
        return new Promise((resolve, reject) => {
            this.nedb.insert(token, (err: Error | null, doc: SessionToken) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    public async getSessionToken(tokendId: string): Promise<SessionToken | undefined> {
        return new Promise((resolve, reject) => {
            this.nedb.find({tokendId: tokendId}, (err: Error | null, doc: any[]) => {
                if (err) {
                    reject(err);
                } else {
                    if (doc.length == 0) {
                        resolve(undefined)
                    } else {
                        resolve(doc[0]);
                    }
                }
            })
        })
    }
}
