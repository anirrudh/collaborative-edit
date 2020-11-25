import { Box } from 'rebass';
import { Label, Textarea } from '@rebass/forms'; 

const simpleEditor = () => {
	return(
<div>
<Box>
  <Label htmlFor='comment'>Comment</Label>
  <Textarea
    id='comment'
    name='comment'
  />
		  </Box>
			  </div>);
}
