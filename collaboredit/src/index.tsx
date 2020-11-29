import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import Navbar from './components/navbar';

ReactDOM.render(
	<BrowserRouter>
	<Navbar />
	</BrowserRouter>
	, document.getElementById('root') as HTMLElement);
