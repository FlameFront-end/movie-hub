import React from 'react'
import './MovieCard.scss'
import { category } from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'
import { Link } from 'react-router-dom'
import MyButton from '../MyButton/MyButton'

const MovieCard = props => {
	const item = props.item
	const link = '/' + category[props.category] + '/' + item.id
	const bg = apiConfig.w500lImage(item.poster_path || item.backdrop__path)

	return (
		<Link to={link}>
			<div className='movie-card' style={{ backgroundImage: `url(${bg})` }}>
				<MyButton>
					<i className='bx bx-play'></i>
				</MyButton>
			</div>
			<h3 className='card-title'>{item.title || item.name}</h3>
		</Link>
	)
}

export default MovieCard
