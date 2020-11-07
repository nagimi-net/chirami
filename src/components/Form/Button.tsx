import React, { ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({
	value,
	className,
	...rest
}: Props): JSX.Element {
	return (
		<button className={classNames('c-form-button', className)} {...rest}>
			{value}
		</button>
	)
}
