import React from 'react'
import './MyButton.scss'
import PropTypes from 'prop-types'

const MyButton = props => {
	return (
		<button
			className={`btn ${props.className}`}
			onClick={props.onClick ? () => props.onClick() : null}
		>
			{props.children}
		</button>
	)
}

export const OutlineButton = props => {
	return (
		<MyButton
			className={`btn-outline ${props.className}`}
			onClick={props.onClick ? () => props.onClick() : null}
		>
			{props.children}
		</MyButton>
	)
}

MyButton.propTypes = {
	onClick: PropTypes.func
}

export default MyButton
