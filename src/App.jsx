import React from 'react'
import './App.scss'
import 'swiper/swiper.min.css'
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import MyRoutes from './config/Routes'
import Catalog from './pages/Catalog'
import Detail from './pages/Detail'
import Home from './pages/Home'

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path='/:category/search/:keyword' element={<Catalog />} />
				<Route path='/:category/:id' element={<Detail />} />
				<Route path='/' exact element={<Home />} />
				<Route path='/:category' element={<Catalog />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	)
}

export default App
