import { w3cwebsocket as W3CWebSocket } from "websocket";
/*
 * Send character message changes from Automerge
 * to the server allowing for messages regarding the changes
 * to be exhanged.
 */

const ws = new W3CWebSocket("ws://localhost:8090");

export const sendCharChanges = (char_input_change) => {
  console.log("Sending Char Changes...");
  ws.send(JSON.stringify(char_input_change));
};

export const recieveChanges = () => {
  let msg;
  ws.onmessage = function incoming(data: any) {
    msg = JSON.parse(data);
  };
  return msg;
};
