import { Route, Routes } from 'react-router-dom';
import './styles/App.css'
import HomePage from '../pages/HomePage/index'

function App() {


  return (
		<>
			<Routes>
				<Route path='/' element={<HomePage />} />
			</Routes>
		</>
	);
}

export default App
