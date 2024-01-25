import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import TopPage from './pages/TopPage/TopPage';
import './App.css';

const App: React.FC = () => (
	<Router>
		<div className="app">
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<TopPage />} />
				</Routes>
			</main>
		</div>
	</Router>
);

export default App;
