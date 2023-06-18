import React from 'react'
import './Footer.scss'

import bg from '../../assets/footer-bg.jpg'
import logo from '../../assets/tmovie.png'
import { Link } from 'react-router-dom'

const Footer = () => {
	return (
		<footer className='footer' style={{ backgroundImage: `url(${bg})` }}>
			<div className='footer__content container'>
				<div className='footer__content__logo'>
					<div className='logo'>
						<img src={logo} alt='logo' />
						<Link to='/'>MovieHub</Link>
					</div>
				</div>
				<div className='footer__content__menus'>
					<div className='footer__content__menu'>
						<Link to='/'>Home</Link>
						<Link to='/'>Home</Link>
						<Link to='/'>Contact us</Link>
						<Link to='/'>Term of services</Link>
						<Link to='/'>About us</Link>
					</div>
					<div className='footer__content__menu'>
						<Link to='/'>Live</Link>
						<Link to='/'>FAQ</Link>
						<Link to='/'>Premium</Link>
						<Link to='/'>Term of services</Link>
						<Link to='/'>Privacy policy</Link>
					</div>
					<div className='footer__content__menu'>
						<Link to='/'>You mus watch</Link>
						<Link to='/'>Recent release</Link>
						<Link to='/'>Top IMDB</Link>
						<Link
							to='https://flamefront-end.github.io/kaliganov-frontend/'
							target='_blank'
						>
							Artem Kaliganov
						</Link>
						<Link to='https://github.com/FlameFront-end' target='_blank'>
							GitHub
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
