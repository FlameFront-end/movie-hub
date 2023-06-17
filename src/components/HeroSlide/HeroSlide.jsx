import React, { useEffect, useRef, useState } from 'react'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useNavigate } from 'react-router-dom'
import tmdbApi, { category, movieType } from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'
import MyButton, { OutlineButton } from '../MyButton/MyButton'

import './HeroSlide.scss'
import Modal, { ModalContent } from '../Modal/Modal'

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
			{movieItems.map((item, index) => (
				<TrailerModal key={index} item={item} />
			))}
		</div>
	)
}
const HeroSlideItem = props => {
	const navigate = useNavigate()

	const item = props.item
	const background = apiConfig.originalImage(
		item.backdrop_path ? item.backdrop_path : item.poster_path
	)

	const setModalActive = async () => {
		const modal = document.querySelector(`#modal_${item.id}`)
		console.log(modal)

		const videos = await tmdbApi.getVideos(category.movie, item.id)
		console.log(videos.results)

		if (videos.results.length > 0) {
			console.log('key', videos.results[0].key)
			const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key
			modal
				.querySelector('.modal__content > iframe')
				.setAttribute('src', videSrc)
		} else {
			modal.querySelector('.modal__content').innerHTML = 'No trailer'
		}

		modal.classList.toggle('active')
	}

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
						<OutlineButton onClick={setModalActive}>
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

const TrailerModal = props => {
	const item = props.item

	const iframeRef = useRef(null)

	const onClose = () => {
		iframeRef.current.setAttribute('src', '')
	}

	return (
		<Modal active={false} id={`modal_${item.id}`}>
			<ModalContent onClose={onClose}>
				<iframe
					ref={iframeRef}
					width='100%'
					height='500px'
					title='trailer'
				></iframe>
			</ModalContent>
		</Modal>
	)
}

export default HeroSlide
