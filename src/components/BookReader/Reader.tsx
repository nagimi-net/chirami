import React, { Component, HTMLAttributes } from 'react'
import classNames from 'classnames'
import moment from 'moment'

import Card, { CardBody } from '../Card'
import Listing, { ListingScroll } from '../Listing'

import { Book, BookChapter, BookPage, BookStatus } from '../../interfaces/Book'
import { SourceManager } from '../../interfaces/Source'

import './Reader.scss'

interface ReaderModuleProps extends Pick<HTMLAttributes<HTMLDivElement>, 'style' | 'className'> {
	sourceIndex: string;
	book?: Book;

	isLoading?: boolean;
	onBack?: () => void;
}
interface ReaderModuleState extends Book {
	navigationHeight: number;

	activeChapter?: BookChapter;
	activeChapterPages: BookPage[];
	activePage?: BookPage;

	chapterLoading: boolean;
}

export default class ReaderModule extends Component<ReaderModuleProps, ReaderModuleState> {

	static DEFAULT_COVER_SIZE = 25;

	cacheChapterPages: { [key: string]: BookPage[] };

	constructor(props: Readonly<ReaderModuleProps>){
		super(props);

		this.cacheChapterPages = {};

		this.state = {
			author: [],
			chapters: [],
			description: '',
			cover: '',
			genre: [],
			relased: '',
			title: '',
			title_alt: [],
			type: '',
			index: '',
			status: BookStatus.UNDEFINED,

			navigationHeight: 0,

			activeChapter: undefined,
			activeChapterPages: [],
			activePage: undefined,

			chapterLoading: false,
		}
	}

	getActiveChapterPage = async (chapterIndex: string): Promise<BookPage[]> => {
		const data = this.cacheChapterPages[chapterIndex];
		if (!!data) {
			return data;
		}
		else {
			const sourceIndex = this.props.sourceIndex;
			const bookIndex = this.state.index;

			if (!sourceIndex || !bookIndex || !chapterIndex) return [];

			const result = await SourceManager.getChapter(sourceIndex, bookIndex, chapterIndex);

			if (!result) return [];

			result.forEach(data => {
				const img = new Image();
				img.src = `${data.url}`;
			});

			this.cacheChapterPages[chapterIndex] = result;
			return result;
		}
	}

	componentDidMount = (): void => {
		const navigationHeight = document.getElementById('reader-navigation')?.clientHeight || 0;

		this.setState({ navigationHeight, ...(this.props.book as unknown as Book) });
	}

	componentDidUpdate = (prevProps: ReaderModuleProps): void => {
		if (prevProps.book?.index !== this.props.book?.index) {
			this.setState({ ...this.state, ...(this.props.book) })
		}
	}

	changeChapter = (chapterIndex: string): void => {

		this.setState({ chapterLoading: true });

		const chapter = this.state.chapters.find(e=>e.index === chapterIndex);

		this.setState({ activeChapter: chapter, activePage: undefined }, async () => {
			const pages = await this.getActiveChapterPage(chapterIndex);
			this.setState({
				activeChapterPages: pages,
				chapterLoading: !(true && (this.state.activeChapter && this.state.activeChapter.index === chapterIndex))
			});
		});
	}

	changeChapterPage = (activePage: BookPage): void => {
		this.setState({ activePage });
	}

	closeChapter = (): void => {
		this.setState({ activeChapter: undefined, activePage: undefined });
	}

	render(): JSX.Element {
		const { className, style } = this.props;
		const activeChapter = this.state.activeChapter;
		const activePage = this.state.activePage;

		return (
			<div id="book-reader" className={classNames(className, 'd-flex align-items-stretch')} style={style}>
				<div className="book-reader-bg blur image-bg" style={{
					backgroundImage: `url('${this.state.cover}')`,
					backgroundPositionY: '0',
					height: 200,
				}} />
				<div id="reader-menu" className="book-element reader-menu flex-shrink-1 d-flex">
					<div className="menu-wrapper border-right flex-full-h d-flex">
						<div className="reader-menu-chapter d-flex flex-column">
							<div className="flex-shrink-1">
								<div className="menu-element menu-header">
									<HeaderToggleNav onBackClick={this.props.onBack as ()=>void}>
										{this.state.title}
									</HeaderToggleNav>
								</div>
							</div>
							<ListingScroll className="menu-element menu-body flex-grow-1">
								<div style={{ height: ReaderModule.DEFAULT_COVER_SIZE }} />
								<Listing
									className="chapters"
									innerClassName={classNames('chapters-inner')}
									columnSize={1} gapSize={4}
								>
									{this.state.chapters.map((chapter) => (
										<Card key={chapter.index}
											className={classNames('chapter-item', { active: chapter.index === this.state.activeChapter?.index })}
											onClick={() => this.changeChapter(chapter.index)}
										>
											<CardBody className="d-flex align-items-center justify-content-between">
												<div className="label">{chapter.label}</div>
												<div className="date">{moment(chapter.date).format('DD/MM/YYYY')}</div>
											</CardBody>
										</Card>
									))}
								</Listing>
								<div style={{ height: ReaderModule.DEFAULT_COVER_SIZE }} />
							</ListingScroll>
						</div>
					</div>
					{
						typeof activeChapter != 'undefined' && (
							<div className="reader-menu-page menu-wrapper d-flex flex-column  border-right">
								<div className="flex-shrink-1">
									<div className="menu-element menu-header">
										<HeaderToggleNav onBackClick={this.closeChapter}>
											<span>{activeChapter.label}</span>
											{
												this.state.chapterLoading && (
													<span>(loading...)</span>
												)
											}
										</HeaderToggleNav>
									</div>
								</div>
								{
									!this.state.chapterLoading && (
										<ListingScroll className="menu-element menu-body flex-grow-1">
											<div style={{ height: ReaderModule.DEFAULT_COVER_SIZE }} />
											<Listing
												className="book-pages"
												innerClassName={classNames('m-reader-book-page', 'page-list')}
												columnSize={1} gapSize={4}
											>
												{this.state.activeChapterPages.map((page) => (
													<Card key={`${this.state.activeChapter?.index}${page.label}`}
														onClick={() => this.changeChapterPage(page)} className={classNames('book-page-item image-bg', { active: page.index === this.state.activePage?.index })}
														style={{ backgroundImage: `url(${page.url})` }}>
														<CardBody className="book-page-inner" style={{ textAlign: 'center' }}>
															<span className="book-page-label">{page.label}</span>
														</CardBody>
													</Card>
												))}
											</Listing>
											<div style={{ height: ReaderModule.DEFAULT_COVER_SIZE }} />
										</ListingScroll>
									)
								}
							</div>
						)
					}
				</div>
				<div id="reader-content" className="book-element flex-grow-1 d-flex align-items-center justify-content-center">
					{
						typeof activePage !== 'undefined' ? (
							<img alt={this.state.title} src={activePage.url} style={{maxWidth: '100%', maxHeight: '100%'}} />
						) :
						// typeof activeChapter !== 'undefined' ? (
						// 	<div>
						// 		<h3>No Preview Available</h3>
						// 	</div>
						// ) :
						(
							<BookDetail
								title={this.state.title}
								genre={this.state.genre}
								author={this.state.author}
								cover={this.state.cover}
								description={this.state.description}
								index={this.state.index}
								relased={this.state.relased}
								status={this.state.status}
								title_alt={this.state.title_alt}
								type={this.state.type}
							/>
						)
					}
				</div>
			</div>
		)
	}
}


const HeaderToggleNav = (props: {
	onBackClick: () => void;
	children: any;
}) => (
	<div className="flex-full d-flex align-items-stretch">
		<div className="d-flex align-items-center">
			<a className="button" href="#" onClick={props.onBackClick}
				style={{
				textAlign: 'center',
				fontWeight: 'bold',
				width: '40px',
				borderRadius: '40px',
				lineHeight: '40px',
				backgroundColor: '#ddd',
				marginLeft: 10
			}}>&lt;&lt;</a>
		</div>
		<div className="flex-grow-1">
			<div className="flex-full d-flex flex-column align-items-center justify-content-center" style={{padding: 10}}>
				{props.children}
			</div>
		</div>
	</div>
)

class BookDetail extends Component<Partial<Book>, { moreDescription: boolean }> {
	constructor(props: Readonly<Partial<Book>>) {
		super(props);

		this.state = {
			moreDescription: false,
		}
	}

	seeDescription = () => {
		this.setState({ moreDescription: true });
	}

	render() {
		const props = this.props;

		const description = (props.description && props.description?.split(' ', 50).join(' ')) as string;

		return (
			<div className="book-detail d-flex align-items-stretch" style={{ padding: 20 }}>
				<div className="book-detail-cover">
					<div className="cover-image image-bg flex-full" style={{ backgroundImage: `url('${props.cover}')` }} />
				</div>
				<div className="book-detail-desc">
					<div className="book-detail-item detail-title">
						<span>{props.title}</span>
						{
							!!props.relased && (
								<>{' '}<span>({props.relased})</span></>
							)
						}
					</div>
					<div className="book-detail-item detail-author">
						<span className="label">Author(s): </span>
						<div className="value">
							{
								!!props.author && props.author.length > 0
									? props.author?.map(e => <span key={e}>{e}</span>)
									: <span>unknown</span>
							}
						</div>
					</div>
					{
						!!props.description && (
							<div className="book-detail-item detail-description">
								<span className="label">Description: </span>
								<div className="value">
									{
										this.state.moreDescription || description.length >= props.description.length ? (
											<span>{props.description}</span>
										) : (
											<span>{description}...<a className="button" href="#" onClick={this.seeDescription}>(see more)</a></span>
										)
									}
								</div>
							</div>
						)
					}
					{
						!!props.status && (
							<div className="book-detail-item detail-status">
								<span className="label">Relase Status: </span>
								<div className="value">
									<span>{props.status}</span>
								</div>
							</div>
						)
					}
					{
						!!props.title_alt && props.title_alt.length > 0 && (
							<div className="book-detail-item detail-title-alt">
								{props.title_alt?.map(e => <span key={e}>{e}</span>)}
							</div>
						)
					}
					{
						!!props.genre && props.genre.length > 0 && (
							<div className="book-detail-item detail-genre">
								{props.genre?.map(e => <a key={e} className="button" href="#">{e}</a>)}
							</div>
						)
					}
				</div>
			</div>
		)
	}
}
