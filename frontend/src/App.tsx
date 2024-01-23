import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
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
			<Footer />
		</div>
	</Router>
);

export default App;
