import React, { Component, Fragment, HTMLAttributes } from 'react'
import classNames from 'classnames'
import { Book } from '../../interfaces/Book';
import { SourceManager } from '../../interfaces/Source';
import Listing, { ListingScroll } from '../Listing';
import Modal from '../Modal';
import BookReader from '../BookReader';
import BookCover from '../BookCover';

interface BookCatalogProps extends Pick<HTMLAttributes<HTMLDivElement>, 'style'> {
	sourceIndex: string;
	bookList: Book[];

	onClick?: (book: Book, index?: number) => void;
	columnSize?: number;
}

interface BookCatalogState {
	bookContext: Book | null;
}

class BookCatalog extends Component<BookCatalogProps, BookCatalogState> {

	static defaultProps: Partial<BookCatalogProps> = {
		columnSize: 1,
	}

	constructor(props: Readonly<BookCatalogProps>){
		super(props);

		this.state = {
			bookContext: null,
		}
	}

	openBook = async (bookIndex: string): Promise<void> => {
		const book = await SourceManager.getBook(this.props.sourceIndex, bookIndex);
		this.setState({ bookContext: book });
	}

	closeBook = (): void => {
		this.setState({ bookContext: null });
	}

	onClick = (book: Book, index: number): void => {
		this.openBook(book.index);

		if (typeof this.props.onClick === 'function') {
			this.props.onClick(book, index);
		}
	}

	render(): JSX.Element {
		return (
			<Fragment>
				<ListingScroll className={classNames('c-book-catalog')}>
					<Listing columnSize={this.props.columnSize}>
						{
							this.props.bookList.map((book, i) => (
								// <Card key={book.index} onClick={()=>this.onClick(book, i)}>
								// 	<CardBody className="d-flex align-items-center justify-content-between">
								// 		<span>{book.title}</span>
								// 		<span>{book.genre.join(', ')}</span>
								// 	</CardBody>
								// </Card>

								<BookCover key={`${this.props.sourceIndex}_${book.index}`}
									onClick={()=>this.onClick(book, i)}
									title={book.title}
									cover={book.cover}
								/>
							))
						}
					</Listing>
				</ListingScroll>
				<Modal toggle={!!this.state.bookContext} onBlur={this.closeBook}>
					<div className="flex-full d-flex flex-column" style={{padding: 20}}>
						<BookReader
							sourceIndex={this.props.sourceIndex}
							book={this.state.bookContext as Book}
							onBack={this.closeBook}
							//className="flex-full flex-grow-1"
							style={{ borderRadius: 20 }}
						/>
					</div>
				</Modal>
			</Fragment>
		)
	}
}


export default BookCatalog;
