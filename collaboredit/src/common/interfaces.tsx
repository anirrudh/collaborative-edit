import { Server } from 'ws';
import express from 'express';
/*
 * This interface defines the group of definitions
 * that the rtc sever will use in order to talk
 * with other clients.
 */
interface rtcserverValues {
	HOST: string; 
	PORT: number;
	wssPORT: number;
}

export { rtcserverValues };

/*
 * Globally available express server and websocket server
 * so that we can easily share the comms pattern between
 * different widgets in the ecosystem
 */
interface rtcServer {
	wss: Server;
	rtcs: express;
}

export { rtcServer }; 
    
