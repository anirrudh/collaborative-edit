import * as React from "react";
import { useEffect, useState } from "react";
import { test_automerge, init_am_doc, init_am_doc_text, capture_character_input, changes_am_doc, merge_am_doc, capture_character_delete } from "../../rtc/capture";
import { Box, Button } from "rebass";
import { Label, Textarea } from "@rebass/forms";

const SimpleEditor = (props: any) => {
  const [text, setText] = useState(null);
  const [prevLen, setPrevLen] = useState(0);	       // The last length of an unmodified change
  const [currentDoc, setCurrentDoc] = useState({});            // Current Doc (refactor out)
  const [changedDoc, setChangedDoc] = useState([]); 	       // Doc compiled with changes

  const handleText = (event: React.ChangeEvent) => {
    // Algo to check if charater was added or not
    let currLen = event.target.value.length;
    if (prevLen < currLen) {
	let text_char = event.target.value[currLen-1];
    	setChangedDoc(capture_character_input(currentDoc, changedDoc, text_char));
    	setPrevLen(currLen);
	test_automerge();
	}
   else {
	console.log("A character was deleted"); 
	   //setChangedDoc(capture_character_delete(currentDoc, changedDoc, text_char));

    }

    setText(event.target.value); 
    event.preventDefault();
  };

  const broadcastChanges = () => {
    	changes_am_doc(currentDoc, changedDoc);
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
	setCurrentDoc(init_am_doc());
	setChangedDoc(init_am_doc_text());
  });
  return (
    <div>
      <Box p={5} fontSize={4}>
        <Label htmlFor="comment">Collaboration Text Area</Label>
        <Textarea id="comment" name="comment" onChange={handleText} />
	<br />
	<Button variant="primary" mr={2} onClick={handleGetChangesHost}> Check Host Changes </Button>
      </Box>
    </div>
  );
};

export default SimpleEditor;
