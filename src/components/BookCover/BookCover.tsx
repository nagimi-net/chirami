import React, { HTMLAttributes } from 'react'
import classNames from 'classnames'
import Card, { CardBody } from '../Card'
import { Book } from '../../interfaces/Book'

import './BookCover.scss'


type Props = Pick<HTMLAttributes<HTMLDivElement>, 'style' | 'className' | 'onClick'>;

interface BookCoverProps extends Partial<Pick<Book, 'cover' | 'title'>> {
	height: number;
}


const widthratio = (height: number) => height * 0.7; // (350/500)

export const BookCover = ({
	cover,
	title,

	className,
	height = 150,
	...rest
}: Partial<BookCoverProps> & Props): JSX.Element => {
	const width = widthratio(height);
	return (
		<Card className={classNames('c-book-cover d-flex align-items-stretch', className)} {...rest}>
			<div className="c-book-cover-image flex-shrink-1"
				style={{
					backgroundImage: `url('${cover}')`,
					height, width,
					flexBasis: width,
				}} />
			<div className="flex-grow-1">
				<CardBody className="flex-full d-flex align-items-center">
					{title}
				</CardBody>
			</div>
		</Card>
	)
}
export default BookCover;
