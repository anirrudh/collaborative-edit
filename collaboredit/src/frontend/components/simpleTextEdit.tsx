import * as React from "react";
import { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {
  test_automerge,
  init_am_doc,
  init_am_doc_text,
  capture_character_input,
  changes_am_doc,
  merge_am_doc,
  capture_character_delete,
  test_automerge_text,
  parse_am_doc,
} from "../../rtc/capture";
import {
	sendCharChanges,
	recieveChanges
} from "../../rtc/connws";
import { Box, Button } from "rebass";
import { Label, Textarea } from "@rebass/forms";

const ws = new W3CWebSocket('ws://localhost:8090');

const SimpleEditor = (props: any) => {
  const [text, setText] = useState(null);
  const [prevLen, setPrevLen] = useState(0); // The last length of an unmodified change
  const [currentDoc, setCurrentDoc] = useState(init_am_doc()); // Current Doc (refactor out)
  const [changedDoc, setChangedDoc] = useState(init_am_doc_text()); // Doc compiled with changes
  const [wsConnection, setWsConnection] = useState(ws);

  /*
   * Broadacast any incoming changes using websockets
   */
  const broadcastChanges = (x: any) => {
    const f = changes_am_doc(currentDoc, x);
    console.log("changes made -> :", f);
    ws.send(JSON.stringify(f));
  };

  /*
   * Recieve any incoming data on on open websocket port
   */
  const recieveCharChanges = (message: any) => {
	  let changes = JSON.parse(message.data);
	  console.log('changesss', changes);
	  let newDoc = parse_am_doc(currentDoc, changes)
	  console.log(newDoc);
  }

  const handleText = (event: React.ChangeEvent) => {

    // Algo to check if charater was added or not
    const currLen = event.target.value.length;
    if (prevLen < currLen) {
      const text_char = event.target.value[currLen - 1];
      const x = capture_character_input(currentDoc, changedDoc, text_char);
      console.log(wsConnection);
      broadcastChanges(x);
      setPrevLen(currLen);
    } else {
      console.log("A character was deleted");
    }
    setText(event.target.value);
	  //  recieveCharChanges();
    event.preventDefault();
  };

  /*
   * This function gets changes made on the
   * current host machine and displays the
   * changes that automerge detects.
   */
  const handleGetChangesHost = () => {
    console.log(text);
  };
  useEffect(() => {
        ws.onmessage = ((data:any) => {recieveCharChanges(data)});
  });
  return (
    <div>
      <Box p={5} fontSize={4}>
        <Label htmlFor="comment">Collaboration Text Area</Label>
        <Textarea id="comment" name="comment" onChange={handleText} />
        <br />
        <Button variant="primary" mr={2} onClick={handleGetChangesHost}>
          {" "}
          Check Host Changes{" "}
        </Button>
      </Box>
    </div>
  );
};

export default SimpleEditor;
