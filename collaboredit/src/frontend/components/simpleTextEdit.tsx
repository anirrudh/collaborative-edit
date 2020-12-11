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
import { Box, Button } from "rebass";
import { Label, Textarea } from "@rebass/forms";

const ws = new W3CWebSocket("ws://localhost:8090");

const SimpleEditor = (props: any) => {
  const [text, setText] = useState('');
  const [prevLen, setPrevLen] = useState(0); // The last length of an unmodified change
  const [currentDoc, setCurrentDoc] = useState(init_am_doc()); // Current Doc (refactor out)
  const [changedDoc, setChangedDoc] = useState(init_am_doc_text()); // Doc compiled with changes
  const [wsConnection, setWsConnection] = useState(ws);
  const [selectedText, setSelectedText] = useState('');

  /*
   * Broadacast any incoming changes using websockets
   */
  const broadcastChanges = (x: any) => {
    const f = changes_am_doc(currentDoc, x);
    ws.send(JSON.stringify(f));
  };

  /*
   * Recieve any incoming data on on open websocket port
   */
  const recieveCharChanges = (message: any) => {
    let changes = JSON.parse(message.data);
    let newDoc = parse_am_doc(changedDoc, changes);
    setChangedDoc(newDoc);
  };

  const handleText = (event: React.ChangeEvent) => {
    // Algo to check if character was added or not
    console.log("event outcome", event.target.value);
    const currLen = event.target.value.length;
    console.log("Current length: ", currLen);
    if (prevLen < currLen) {
      const text_char = event.target.value[currLen - 1];
      const x = capture_character_input(changedDoc, text_char, currLen);
      broadcastChanges(x);
      setPrevLen(currLen);
    } else {
      let chars_to_delete = prevLen - currLen; // chars to delete
      console.log(chars_to_delete);
      console.log(event);
      
      setPrevLen(prevLen - chars_to_delete);
    }
    event.preventDefault();
  };

	const handleSelectedText = (event: any) => {
		//console.log(event);
		//console.log(event.target.selectionEnd, event.target.selectionStart, event.target.textLength);
	let selected_chars: string = (event.target.value.substring(
		event.target.selectionStart, event.target.selectionEnd));
		// Create an object that has { `selected char` : `index it exists at` }
		let char_arr = [...selected_chars];
		// thankkkk you https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
		function range(size:number, startAt:number = 0):ReadonlyArray<number> {
		    return [...Array(size).keys()].map(i => i + startAt);
		}
		// TODO: above, technically if I know the first elemnt start at and the size, I know the indicies selected. 
		let char_arr_ind = range(char_arr.length, event.target.selectionStart));
		setSelectedText(
  }
  /*
   * This function gets changes made on the
   * current host machine and displays the
   * changes that automerge detects.
   */
  const handleGetChangesHost = () => {
    console.log(text);
  };
  useEffect(() => {
    ws.onmessage = (message: any) => {
    let changes = JSON.parse(message.data);
    let newDoc = parse_am_doc(changedDoc, changes);
    setChangedDoc(newDoc);
    setText(newDoc.text.toString());
    };
  });
  return (
    <div>
      <Box p={5} fontSize={4}>
        <Label htmlFor="comment">Collaboration Text Area</Label>
		<Textarea id="comment" name="comment" onChange={handleText} onMouseUp={handleSelectedText} value={text} />
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
