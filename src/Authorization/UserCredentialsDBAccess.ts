import {UserCredentials} from "../Shared/Model";
import * as Nedb from 'nedb';
import * as path from 'path';

export class UserCredentialsDBAccess {

    private nedb: Nedb;

    constructor() {
        this.nedb = new Nedb('database/UserCredentials.db');
        this.nedb.loadDatabase();
    }

    public async putUserCredential(userCredentials: UserCredentials): Promise<any> {
        return new Promise((resolve, reject) => {
            this.nedb.insert(userCredentials, (err: Error | null, doc: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            })
        });
    }

    public async getUserCredentials(username: string, password: string): Promise<UserCredentials | undefined> {
        return new Promise((resolve, reject) => {
            this.nedb.find({username, password},
                (err: Error, docs: UserCredentials[]) => {
                    if (err) {
                        reject(err)
                    } else {
                        if (docs.length == 0) {
                            resolve(undefined)
                        } else {
                            resolve(docs[0])
                        }
                    }
                })
        });
    }
}
