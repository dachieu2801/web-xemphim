import React from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";

import Browse from './pages/browse/Browse';
import Search from './pages/search/Search';
import Book from './pages/book/Book';
import Item from './components/components/Release/Item';
// import './App.css';


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Browse />} />
				<Route path="/search" element={<Search />} />
				<Route path="/book" element={<Book />} />
				<Route path="/book/:_id" element={<Item />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
