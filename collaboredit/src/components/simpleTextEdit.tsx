import * as React from 'react';
import { test_automerge, test_wss } from '../rtc/server';
import { Box } from 'rebass';
import { Label, Textarea } from '@rebass/forms'; 

const SimpleEditor = (props: any) => {
	React.useEffect(() => { test_automerge(); test_wss();});
	return(
<div>
<Box p={5}
  fontSize={4}>
  <Label htmlFor='comment'>Collaboration Text Area</Label>
  <Textarea
    id='comment'
    name='comment'
  />
		  </Box>
			  </div>);
}

export default SimpleEditor;
