import express from 'express';
import * as ws from "ws";
import { rtcserverValues } from '../common/interfaces';

const conf: rtcserverValues = {
	HOST: '0.0.0.0',
	PORT: 9876,
	wssPORT: 8090
}

const rtcs = express();
const wss = new ws.Server({port: conf.wssPORT })
console.log(`Websocket Server initializaed at ${conf.PORT}`);
rtcs.get('/', (req: any, res: any) => res.send('Express + TypeScript Server'));
rtcs.listen(conf.PORT, () => {
console.log(`⚡️[server]: Server is running at https://localhost:${conf.PORT}`);
});
