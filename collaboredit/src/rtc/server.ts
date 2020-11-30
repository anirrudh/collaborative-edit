import * as Automerge from 'automerge'; 
import * as ws from "ws";
import { rtcserverValues } from '../common/interfaces';

const conf: rtcserverValues = {
	HOST: '0.0.0.0',
	PORT: 9876,
	wssPORT: 8090
}

export function test_automerge() {
//const wss = new ws.Server({port: conf.wssPORT});
let currentDoc = Automerge.init();
console.log(currentDoc);
// This is kind of like the staging platform
// for changes to be staged and then computed later 
let newDoc = Automerge.change(currentDoc, 'first message', doc => {
  doc.text = new Automerge.Text();
  doc.text.insertAt(0, 'h', 'e', 'l', 'l', 'o');
});
console.log(currentDoc);

let changes = Automerge.getChanges(currentDoc, newDoc);
console.log(changes);
};

export function test_wss() {
	const wss = new ws.Server({port: 8090});
	console.log(`⚡️[server]: Server is running at https://localhost:8090`);
};
