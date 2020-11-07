import React, { HTMLAttributes } from 'react'
import classNames from 'classnames'

type Props = HTMLAttributes<HTMLDivElement>

interface WrapperProps {
	isLoading: boolean;
}

export const Wrapper = ({
	className,
	children,
	isLoading,
	...rest
}: Partial<WrapperProps> & Props): JSX.Element => (
		<div className={classNames('c-card', className, {'is-loading': isLoading})} {...rest}>
			{children}
			{isLoading && (
				<div className="c-card-loading" />
			)}
		</div>
	)

export const Header = ({
	className,
	children,
	...rest
}: Props): JSX.Element => (
		<div className={classNames('c-card-header', className)} {...rest}>
			{children}
		</div>
	)

export const Body = ({
	className,
	children,
	...rest
}: Props): JSX.Element => (
		<div className={classNames('c-card-body', className)} {...rest}>
			{children}
		</div>
	)

export const Footer = ({
	className,
	children,
	...rest
}: Props): JSX.Element => (
		<div className={classNames('c-card-footer', className)} {...rest}>
			{children}
		</div>
	)
