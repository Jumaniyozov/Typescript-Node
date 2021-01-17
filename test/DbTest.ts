import {UserCredentialsDBAccess} from "../src/Authorization/UserCredentialsDBAccess";

class DbTest {
    public dbAccess: UserCredentialsDBAccess = new UserCredentialsDBAccess();
}


new DbTest().dbAccess.putUserCredential({
    username: "Islom",
    password: 'password',
    accessRights: [1,2,3]
});
