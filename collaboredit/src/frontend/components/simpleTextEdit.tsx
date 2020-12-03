import * as React from "react";
import { useEffect, useState } from "react";
import { test_automerge, capture_character_input } from "../../rtc/capture";
import { Box, Button } from "rebass";
import { Label, Textarea } from "@rebass/forms";

const SimpleEditor = (props: any) => {
  const [text, setText] = useState(null);
  const [textLen, setTextLen] = useState(0);
  const [lastChar, setLastChar] = useState(null);

  const handleText = (event: React.ChangeEvent) => {
    // Algo to check if charater was added or not
    let currLen = event.target.value.length;
    let prevLen = textLen; 
    console.log(prevLen, currLen);
    if (prevLen < currLen) {
	setText(event.target.value); 
	// TODO: Set the character in the doc changes here.
	console.log("Current length higher than previous length.");
	}
   else {
	console.log("A character was deleted"); 
    }
    setTextLen(event.target.value.length);
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
    test_automerge();
  });
  return (
    <div>
      <Box p={5} fontSize={4}>
        <Label htmlFor="comment">Collaboration Text Area</Label>
        <Textarea id="comment" name="comment" onChange={handleText} />
		<Button variant="primary" mr={2} onClick={handleGetChangesHost}> Check Host Changes </Button>
      </Box>
    </div>
  );
};

export default SimpleEditor;
