import * as Automerge from 'automerge'; 
import * as ws from "ws";
import { rtcserverValues } from '../common/interfaces';

const conf: rtcserverValues = {
	HOST: '0.0.0.0',
	PORT: 9876,
	wssPORT: 8090
}

const wss = new ws.Server({port: conf.wssPORT})
const doc = Automerge.init()

console.log(doc)

// This is kind of like the staging platform
// for changes to be staged and then computed later 
currDoc = Automerge.change(doc, 'first message', doc => {
  doc.text = new Automerge.Text()
  doc.text.insertAt(0, 'h', 'e', 'l', 'l', 'o')
})
