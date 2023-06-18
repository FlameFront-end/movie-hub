import React, { useState, useEffect, useCallback } from 'react'
import './MovieGrid.scss'
import { useNavigate, useParams } from 'react-router-dom'
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi'
import MovieCard from '../MovieCard/MovieCard'
import MyButton, { OutlineButton } from '../MyButton/MyButton'
import MyInput from '../MyInput/MyInput'

const MovieGrid = props => {
	const [items, setItems] = useState([])
	const [page, setPage] = useState(1)
	const [totalPage, setTotalPage] = useState(0)
	const { keyword } = useParams()

	useEffect(() => {
		const getList = async () => {
			let response = null
			if (keyword === undefined) {
				const params = {}
				switch (props.category) {
					case category.movie:
						response = await tmdbApi.getMoviesList(movieType.upcoming, {
							params
						})
						break
					default:
						response = await tmdbApi.getTvList(tvType.popular, { params })
				}
			} else {
				const params = {
					query: keyword
				}
				response = await tmdbApi.search(props.category, { params })
			}
			setItems(response.results || [])
			setTotalPage(response.total_pages)
		}
		getList()
	}, [props.category, keyword])

	const loadMore = async () => {
		let response = null
		if (keyword === undefined) {
			const params = {
				page: page + 1
			}
			switch (props.category) {
				case category.movie:
					response = await tmdbApi.getMoviesList(movieType.upcoming, { params })
					break
				default:
					response = await tmdbApi.getTvList(tvType.popular, { params })
			}
		} else {
			const params = {
				page: page + 1,
				query: keyword
			}
			response = await tmdbApi.search(props.category, { params })
		}
		setItems(prevItems => [...prevItems, ...response.results])
		setPage(prevPage => prevPage + 1)
	}

	return (
		<>
			<div className='section mb-3'>
				<MovieSearch category={props.category} keyword={keyword} />
			</div>
			<div className='movie-grid'>
				{items.map((item, i) => (
					<MovieCard category={props.category} item={item} key={i} />
				))}
			</div>
			{page < totalPage ? (
				<div className='movie-grid__loadmore'>
					<OutlineButton className='small' onClick={loadMore}>
						Load more
					</OutlineButton>
				</div>
			) : null}
		</>
	)
}

const MovieSearch = props => {
	const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '')
	const navigate = useNavigate()

	const goToSearch = useCallback(() => {
		if (keyword.trim().length > 0) {
			navigate(`/${category[props.category]}/search/${keyword}`)
		}
	}, [keyword, props.category, navigate])

	useEffect(() => {
		const enterEvent = e => {
			e.preventDefault()
			if (e.keyCode === 13) {
				goToSearch()
			}
		}
		document.addEventListener('keyup', enterEvent, { capture: true })
		return () => {
			document.removeEventListener('keyup', enterEvent, { capture: true })
		}
	}, [keyword, goToSearch])

	return (
		<div className='movie-search'>
			<MyInput
				type='text'
				placeholder='Enter keyword'
				value={keyword}
				onChange={e => setKeyword(e.target.value)}
			/>
			<MyButton className='small' onClick={goToSearch}>
				Search
			</MyButton>
		</div>
	)
}

export default MovieGrid
