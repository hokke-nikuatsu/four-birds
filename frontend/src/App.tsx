import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import TopPage from './pages/TopPage/TopPage';
import './App.css';
import TrainingPage from './pages/TrainingPage/TrainingPage';
import { UserAuthenticator } from './services/auth/userAuthenticator';
import { store } from './services/store/store';

export const userAuthenticator = new UserAuthenticator();

const App = () => (
	<Provider store={store}>
		<Router>
			<div className="app">
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<TopPage />} />
						<Route path="/training/:articleId" element={<TrainingPage />} />
					</Routes>
				</main>
			</div>
		</Router>
	</Provider>
);

export default App;
