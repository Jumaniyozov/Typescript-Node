import {Handler, TokenGenerator} from "./Model";
import {IncomingMessage, ServerResponse} from "http";
import {UsersDBAccess} from "../User/UserDBAccess";
import {HTTP_CODES, HTTP_METHODS} from "../Shared/Model";
import {Utils} from "./Utils";
import {BaseRequestHandler} from "./BaseRequestHandler";

export class UsersHandler extends BaseRequestHandler {


    private usersDBAccess: UsersDBAccess = new UsersDBAccess();

    public constructor(req: IncomingMessage, res: ServerResponse) {
        super(req, res);
    }

    public async handleRequest(): Promise<void> {
        switch (this.req.method) {
            case HTTP_METHODS.GET:
                await this.handleGet();
                break;

            default:
                await this.handleNotFound();
                break
        }
    }

    private async handleGet() {
        const parsedUrl = Utils.getUrlParameters(this.req.url);
    }

}
