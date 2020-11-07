import React, { HTMLAttributes } from 'react'
import classNames from 'classnames'
//import './Listing.scss'

type Props = Pick<Omit<HTMLAttributes<HTMLDivElement>, 'children'>, 'className' | 'style' | 'onClick' | 'onScroll'>

interface ListingProps extends Props {
	columnSize: number;
	children: JSX.Element[];
	gapSize: number;
	innerClassName: string;
	innerProps: Props;
}

export const Listing = ({
	className,
	innerClassName,
	children = [],
	columnSize = 1,
	gapSize = 0,
	innerProps = {},
	...rest
}: Partial<ListingProps>): JSX.Element => {
	const maxSize = 100 / Math.max(columnSize, 1);
	const maxGap = gapSize/2;
	const { style: innerStyle = {}, ...innerRest } = innerProps as Props;

	return (
		<div className={classNames(className, 'c-listing')} {...rest}>
			<div className={classNames(innerClassName, 'c-listing-inner d-flex flex-wrap')}
				style={{
					...(gapSize ? { margin: `-${maxGap}px` } : {}),
					...(gapSize ? { padding: `${gapSize}px` } : {}),
					...innerStyle,
				}}
				{...innerRest}
			>
				{children.map((e, index) => (
					<div key={`---${index}`} className="flex-shrink-1"
						style={{
							...(gapSize ? { padding: `${maxGap}px` } : {}),
							flexBasis: `${maxSize}%`,
							width: `${maxSize}%`,
						}}
					>{e}</div>
				))}
			</div>
		</div>
	)
}

export const ListingScroll = ({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>): JSX.Element => {
	return (
		<div className={classNames(className, 'c-listing-scroll')} {...rest}>
			{children}
		</div>
	)
}
