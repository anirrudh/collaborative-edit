import * as React from 'react';
import SimpleEditor from './simpleTextEdit';
import { Flex, Text, Box, Link as RebassLink } from 'rebass';
import { Textarea } from '@rebass/forms';
import { Link, Switch, Route } from "react-router-dom";

const Navbar = (props) => {
	return (
	<div>
	<Flex
  	px={2}
  	color='white'
  	bg='black'
  	alignItems='center'>
  	<Text p={2} fontWeight='bold'>collaboredit</Text>
  	<Box mx='auto' />
	<RebassLink {...props} as={Link} color="white" p={2} variant= "nav" to="/research" children="Research"/>
	<RebassLink {...props} as={Link} color="white" p={2} to="/about" children="About"/>
	<RebassLink {...props} as={Link} color="white" p={2} to="/simple_editor" children="Simple-Editor"/>
	</Flex>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/research">
            <Research />
          </Route>
	<Route path="/simple_editor">
		<SimpleEditor />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div> 		);
			};
function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function SimpleEdit() {
	return(  <div>
		<Textarea />
		</div>
	);
}

function Research() {
	return( <div>
		<ul>
			<li> An <a href="https://github.com/clintharris/crdt-example-app_annotated/blob/master/NOTES.md"> explanation </a> on how <a href="https://github.com/jlongster/crdt-example-app"> this</a> implementation works. </li>
		</ul>
			</div>
			);
}

export default Navbar;
