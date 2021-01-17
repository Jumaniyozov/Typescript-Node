import {Account, SessionToken, TokenGenerator, TokenRights, TokenState, TokenValidator} from "../Server/Model";
import {UserCredentialsDBAccess} from "./UserCredentialsDBAccess";
import {SessionTokenDBAccess} from "./SessionTokenDBAccess";

export class Authorizer implements TokenGenerator, TokenValidator {

    private userCredDBAccess: UserCredentialsDBAccess = new UserCredentialsDBAccess();
    private sessionTokenDBAcсess: SessionTokenDBAccess = new SessionTokenDBAccess();

    async generateToken(account: Account): Promise<SessionToken | undefined> {
        const resultAccount = await this.userCredDBAccess.getUserCredentials(
            account.username,
            account.password
        )

        if (resultAccount) {
            const token: SessionToken = {
                accessRights: resultAccount.accessRights,
                expirationTime: this.generateExpirationTime(),
                username: account.username,
                valid: true,
                tokenId: this.generateRandomTokenId()
            }
            await this.sessionTokenDBAcсess.storeSessionToken(token);
            return token;
        } else {
            return undefined;
        }
    }

    public async validateToken(tokenId: string): Promise<TokenRights> {
        const token = await this.sessionTokenDBAcсess.getSessionToken(tokenId);
        if (!token || !token.valid) {
            return {
                accessRights: [],
                state: TokenState.INVALID
            }
        } else if (token.expirationTime < new Date()) {
            return {
                accessRights: [],
                state: TokenState.EXPIRED
            }
        } else {
            return {
                accessRights: token.accessRights,
                state: TokenState.VALID
            }
        }
    }

    private generateExpirationTime() {
        return new Date(Date.now() + 60 * 60 * 1000);
    }

    private generateRandomTokenId() {
        return Math.random().toString(36).slice(2);
    }
}
