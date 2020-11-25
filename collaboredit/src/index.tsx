import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Flex, Text, Box, Link as RebassLink } from 'rebass';
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";

function Navbar(props: any) {
	return(
		<div>
	<Flex
  	px={2}
  	color='white'
  	bg='black'
  	alignItems='center'>
  	<Text p={2} fontWeight='bold'>Rebass</Text>
  	<Box mx='auto' />
	<RebassLink {...props} as={Link} to="/research" children="Research"/>
	<RebassLink {...props} as={Link} to="/about" children="About"/>
	<RebassLink {...props} as={Link} to="/simple_editor" children="Simple-Editor"/>
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
		<h1>placeholder</h1>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div> );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Research() {
  return <h2>Users</h2>;
}

ReactDOM.render(
	<BrowserRouter>
	<h1> Welcome to the react app </h1>
	<Navbar />
	</BrowserRouter>
	, document.getElementById('root') as HTMLElement);
