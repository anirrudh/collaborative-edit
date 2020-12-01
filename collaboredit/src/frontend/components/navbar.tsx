import * as React from 'react';
import SimpleEditor from './simpleTextEdit';
import Research from './research';
import Home from './home';
import { Flex, Text, Box, Link as RebassLink } from 'rebass';
import { Link, Switch, Route } from "react-router-dom";

const Navbar = (props: any) => {
	return (
	<div>
	<Flex
  	px={2}
  	color='white'
  	bg='black'
  	alignItems='center'>
		<RebassLink {...props} color="white" as={Link} to="/"><Text p={2} fontWeight='bold'>collaboredit</Text></RebassLink>
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

function About() {
  return <h2>About</h2>;
}

export default Navbar;
