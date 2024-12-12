import { Route, Routes } from 'react-router-dom';
import './styles/App.css'
import HomePage from '../pages/HomePage/index'
import LoginPage from '../pages/LoginPage/ui';
import RegistrationPage from '../pages/RegistrationPage/ui';

function App() {


  return (
		<>
			<Routes>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/registration' element={<RegistrationPage />} />
				<Route path='/users' element={<HomePage />} />
			</Routes>
		</>
	);
}
//! Сделана только серверная логика(Регистрация, логин, логаут, рефреш, получение полоьзователей)
export default App
