import {UserCredentialsDBAccess} from "../src/Authorization/UserCredentialsDBAccess";
import {UsersDBAccess} from "../src/User/UserDBAccess";

class DbTest {
    public dbAccess: UserCredentialsDBAccess = new UserCredentialsDBAccess();
    public userDBAccess: UsersDBAccess = new UsersDBAccess();
}


// new DbTest().dbAccess.putUserCredential({
//     username: "Islom",
//     password: 'password',
//     accessRights: [1,2,3]
// });

new DbTest().userDBAccess.putUser({
    age: 30,
    email: 'some@mail.com',
    id: 'asd23234',
    name: 'Qwerty One',
    workingPosition: 3
}).catch(err => console.error(err.message));
