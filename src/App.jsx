import React from 'react'
import './App.scss'
import 'swiper/swiper.min.css'
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import MyRoutes from './config/Routes'


const App = () => {
	return (
			<>
				<Header />
				<MyRoutes/>
				<Footer />
			</>
	)
}

export default App
