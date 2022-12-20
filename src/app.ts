import express, { Application } from "express";
import mongoose from "mongoose";
import * as path from 'path';
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from "dotenv";
import helmet from "helmet";
import Controller from './utils/interfaces/controller.interface';
import ErrorMiddleware from '../src/middleware/error.middleware';
import * as http from 'http';
import * as WebSocket from 'ws';
import { Server } from "socket.io";
import { StringDecoder } from "string_decoder";

class App {
    public express: Application;
    public port: number;
    public server: any;
  
    constructor(controllers: Controller[], port: number, result: any) {
        this.express = express();
        this.port = port;
        this.server = http.createServer(this.express);

        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
        this.initialiseWebSocketConnection(result);
    }

    private initialiseMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        // this.express.use(express.static(path.join(__dirname, "public")));
        this.express.use("/src/files", express.static(path.join(__dirname + "/src/files")));
        this.express.use(compression());
    }

    private initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initialiseErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    private initialiseDatabaseConnection(): void {
    //    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

        mongoose.connect(
            `mongodb+srv://juthi:juthisarker123456@assignment-task.0zzetkz.mongodb.net/?retryWrites=true&w=majority`
        );
    }

    public initialiseWebSocketConnection(result: string): void {
        const io = new Server( this.server ,{
            cors:{
                origin:"*",
                methods:["GET","POST"]
            }
        });
        io.on('connection', () => {
         console.log('user is connected');
         io.emit(result);
        });

    }

    public listen(): void {
         this.server.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
export default App;
