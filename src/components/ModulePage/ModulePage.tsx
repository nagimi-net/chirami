import React, { HTMLAttributes } from 'react'
import classNames from 'classnames'
import './ModulePage.scss'

type Props = HTMLAttributes<HTMLDivElement>

export const ModulePage = ({
	children,
	className,
	...rest
}: Props): JSX.Element => (
		<div className={classNames('c-module-page', className)} {...rest}>
			{children}
		</div>
	)
