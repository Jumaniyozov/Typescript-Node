import {TokenGenerator, Account, SessionToken} from "../Server/Model";

export class Authorizer implements TokenGenerator {

    async generateToken(account: Account): Promise<SessionToken | undefined> {
        if (account.username === 'qwert' &&
            account.password === 'qwert') {
            return {
                tokenId: 'someTokenId'
            }
        } else {
            return undefined;
        }
    }
}
