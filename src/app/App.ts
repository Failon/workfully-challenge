import { Server } from './server';

export class App {
    server?: Server;

    async start() {
        const port = process.env.PORT || '3000';
        this.server = new Server(port);
        console.log('listening on port' + port)

        return this.server.listen();
    }

    get httpServer() {
        return this.server?.getHTTPServer();
    }

    async stop() {
        return this.server?.stop();
    }
}