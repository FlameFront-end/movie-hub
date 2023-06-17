import React, { useEffect, useState } from 'react'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useNavigate } from 'react-router-dom'
import tmdbApi, { category, movieType } from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'
import MyButton, { OutlineButton } from '../MyButton/MyButton'

import './HeroSlide.scss'

const HeroSlide = () => {
	const [movieItems, setMovieItems] = useState([])
	SwiperCore.use([Autoplay])

	useEffect(() => {
		const getMovies = async () => {
			const params = { page: 1 }
			try {
				const response = await tmdbApi.getMoviesList(movieType.popular, {
					params
				})
				setMovieItems(response.results.slice(1, 4))
				console.log(response)
			} catch (e) {
				console.log('error', e)
			}
		}
		getMovies()
	}, [])

	return (
		<div className='hero-slide'>
			<Swiper
				modulee={[Autoplay]}
				grabCursor={true}
				spaceBetween={0}
				slidesPerView={1}
				autoplay={{ delay: 3000 }}
			>
				{movieItems.map((item, index) => (
					<SwiperSlide key={index}>
						{({ isActive }) => (
							<HeroSlideItem
								item={item}
								className={`${isActive ? 'active' : ''}`}
							/>
						)}
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
const HeroSlideItem = props => {
	const navigate = useNavigate()

	const item = props.item
	const background = apiConfig.originalImage(
		item.backdrop_path ? item.backdrop_path : item.poster_path
	)

	return (
		<div
			className={`hero-slide__item ${props.className}`}
			style={{ backgroundImage: `url(${background})` }}
		>
			<div className='hero-slide__item__content container'>
				<div className='hero-slide__item__content__info'>
					<h2 className='title'>{props.title}</h2>
					<div className='overview'>{item.overview}</div>
					<div className='btns'>
						<MyButton onClick={() => navigate('/movie/' + item.id)}>
							Watch now
						</MyButton>
						<OutlineButton onClick={() => console.log('trailer')}>
							Watch trailer
						</OutlineButton>
					</div>
				</div>
				<div className='hero-slide__item__content__info'>
					<img src={apiConfig.w500lImage(item.poster_path)} alt='poster' />
				</div>
			</div>
		</div>
	)
}

export default HeroSlide
