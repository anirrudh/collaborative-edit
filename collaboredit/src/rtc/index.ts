import express from "express";
import * as WebSocket from "ws";
import { rtcserverValues } from "../frontend/common/interfaces";

const conf: rtcserverValues = {
  HOST: "0.0.0.0",
  PORT: 9876,
  wssPORT: 8090,
};

const app: express.Application = express();
const server = app.listen(conf.PORT);
const wss = new WebSocket.Server({ port: conf.wssPORT });
console.log(`⚡️[server]: Server is running at https://localhost:${conf.PORT}`);
console.log(`Websocket Server is running at ws://loaclhost:${conf.wssPORT}`);
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    console.log(data);
    ws.send(data);
  });
});

