import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import TopPage from './pages/TopPage/TopPage';
import './App.css';
import { store } from './services/store/store';

const App = () => (
	<Provider store={store}>
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
	</Provider>
);

export default App;
