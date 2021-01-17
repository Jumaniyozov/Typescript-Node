import {Account} from '../Server/Model';
import exp = require("constants");


export enum AccessRight {
    CREATE,
    READ,
    UPDATE,
    DELETE
}

export interface UserCredentials extends Account {
    accessRights: AccessRight[]
}

export enum HTTP_CODES {
    OK=200,
    CREATED=201,
    BAD_REQUEST=400,
    NOT_FOUND=404,
    UNAUTHRORIZED=401
}

export enum HTTP_METHODS {
    GET='GET',
    POST='POST',
    PUT='PUT',
    DELETE='DELETE',
    PATCH='PATCH'
}

export interface User {
    id: string,
    name: string,
    age: number,
    email: string,
    workingPosition: WorkingPosition
}

export enum WorkingPosition {
    JUNIOR,
    PROGRAMMER,
    ENGINEER,
    EXPERT,
    MANAGER
}
