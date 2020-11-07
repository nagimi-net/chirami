// import React, { Component, HTMLAttributes } from 'react'
// import classNames from 'classnames'
// import moment from 'moment'

// import Card, { CardBody } from '../Card'
// import Listing, { ListingScroll } from '../Listing'

// import { Book, BookChapter, BookPage, BookStatus } from '../../../classes/Book'
// import { SourceManager } from '../../../classes/Source'

// import './Reader.scss'

// interface Props extends Pick<HTMLAttributes<HTMLDivElement>, 'style' | 'className'> {
// }

// interface ReaderModuleProps {
// 	sourceIndex: string;
// 	book?: Book;

// 	isLoading?: boolean;
// 	onBack?: () => void;
// }
// interface ReaderModuleState extends Book {
// 	// coverOpacity: number;
// 	navigationHeight: number;

// 	activeChapter?: BookChapter;
// 	activeChapterPages: BookPage[];
// 	activePage?: BookPage;

// 	chapterLoading: boolean;
// }

// export default class ReaderModule extends Component<ReaderModuleProps & Props, ReaderModuleState> {

// 	static DEFAULT_COVER_SIZE: number = 100;

// 	cacheChapterPages: { [key: string]: BookPage[] };

// 	constructor(props: Readonly<ReaderModuleProps & Props>){
// 		super(props);

// 		this.cacheChapterPages = {};

// 		this.state = {
// 			author: [],
// 			chapters: [],
// 			description: '',
// 			cover: '',
// 			genre: [],
// 			relased: '',
// 			title: '',
// 			title_alt: [],
// 			type: '',
// 			index: '',
// 			status: BookStatus.UNDEFINED,

// 			// coverOpacity: 1,
// 			navigationHeight: 0,

// 			activeChapter: undefined,
// 			activeChapterPages: [],
// 			activePage: undefined,

// 			chapterLoading: false,
// 		}
// 	}

// 	getActiveChapterPage = async (chapterIndex: string) => {
// 		let data = this.cacheChapterPages[chapterIndex];
// 		if (!!data) {
// 			return data;
// 		}
// 		else {
// 			const sourceIndex = this.props.sourceIndex;
// 			const bookIndex = this.state.index;

// 			if (!sourceIndex || !bookIndex || !chapterIndex) return [];

// 			var result = await SourceManager.getChapter(sourceIndex, bookIndex, chapterIndex);

// 			if (!result) return [];

// 			result.forEach(data => {
// 				var img = new Image();
// 				img.src = `${data.url}`;
// 			});

// 			this.cacheChapterPages[chapterIndex] = result;
// 			return result;
// 		}
// 	}

// 	componentDidMount() {
// 		const navigationHeight = document.getElementById('reader-navigation')?.clientHeight || 0;

// 		this.setState({ navigationHeight, ...(this.props.book as unknown as Book) });
// 	}

// 	componentDidUpdate(prevProps: ReaderModuleProps) {
// 		if (prevProps.book?.index !== this.props.book?.index) {
// 			this.setState({ ...this.state, ...(this.props.book) })
// 		}
// 	}

// 	changeChapter = (chapterIndex: string) => {

// 		this.setState({ chapterLoading: true });

// 		var chapter = this.state.chapters.find(e=>e.index === chapterIndex);

// 		this.setState({ activeChapter: chapter, activePage: undefined }, async () => {
// 			var pages = await this.getActiveChapterPage(chapterIndex);
// 			this.setState({
// 				activeChapterPages: pages,
// 				chapterLoading: !(true && (this.state.activeChapter && this.state.activeChapter.index === chapterIndex))
// 			});
// 		});
// 	}

// 	changeChapterPage = (activePage: BookPage) => {
// 		this.setState({ activePage });
// 	}

// 	closeChapter = () => {
// 		this.setState({ activeChapter: undefined, activePage: undefined });
// 	}

// 	// onChapterScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
// 	// 	const data = event.currentTarget;
// 	// 	if (data.scrollTop <= ReaderModule.DEFAULT_COVER_SIZE) {
// 	// 		this.setState({ coverOpacity: 1 - (data.scrollTop / ReaderModule.DEFAULT_COVER_SIZE) });
// 	// 	}
// 	// 	else {
// 	// 		this.setState({ coverOpacity: 0 });
// 	// 	}
// 	// }

// 	render() {
// 		const { className, style } = this.props;
// 		const activeChapter = this.state.activeChapter;
// 		const activePage = this.state.activePage;

// 		return (
// 			<div id="book-reader" className={classNames(className, 'd-flex align-items-stretch')} style={style}>
// 				<div id="reader-menu" className="book-element reader-menu flex-shrink-1">
// 					<div className="menu-cover blur" style={{
// 						backgroundImage: `url('${this.state.cover}')`
// 					}} />
// 					{/* <div className="menu-cover" style={{
// 						backgroundImage: `url('${this.state.cover}')`,
// 						opacity: this.state.coverOpacity,
// 					}} /> */}
// 					<div className="menu-wrapper d-flex flex-column">
// 						<div className="flex-shrink-1">
// 							<div className="menu-element menu-header">
// 								<HeaderToggleNav onBackClick={this.props.onBack as any}>
// 									{this.state.title}
// 								</HeaderToggleNav>
// 							</div>
// 						</div>
// 						<ListingScroll className="menu-element menu-body flex-grow-1"
// 							//onScroll={this.onChapterScroll}
// 						>
// 							<div style={{ height: ReaderModule.DEFAULT_COVER_SIZE }} />
// 							<Listing
// 								className="chapters"
// 								innerClassName={classNames('chapters-inner')}
// 								columnSize={1} gapSize={4}
// 							>
// 								{this.state.chapters.map((chapter) => (
// 									<Card key={chapter.index}
// 										className={classNames('chapter-item', { active: chapter.index === this.state.activeChapter?.index })}
// 										onClick={() => this.changeChapter(chapter.index)}
// 									>
// 										<CardBody className="d-flex align-items-center justify-content-between">
// 											<div className="label">{chapter.label}</div>
// 											<div className="date">{moment(chapter.date).format('DD/MM/YYYY')}</div>
// 										</CardBody>
// 									</Card>
// 								))}
// 							</Listing>
// 							<div style={{ height: ReaderModule.DEFAULT_COVER_SIZE }} />
// 						</ListingScroll>
// 					</div>
// 				</div>
// 				{
// 					typeof activeChapter != 'undefined' && (
// 						<div id="reader-page" className="book-element reader-menu flex-shrink-1">
// 							<div className="menu-wrapper d-flex flex-column">
// 								<div className="flex-shrink-1">
// 									<div className="menu-element menu-header">
// 										<HeaderToggleNav onBackClick={this.closeChapter}>
// 											<span>{activeChapter.label}</span>
// 											{
// 												this.state.chapterLoading && (
// 													<span>(loading...)</span>
// 												)
// 											}
// 										</HeaderToggleNav>
// 									</div>
// 								</div>
// 								<ListingScroll className="menu-element menu-body flex-grow-1">
// 									<div style={{ height: ReaderModule.DEFAULT_COVER_SIZE }} />
// 									<Listing
// 										className="book-pages"
// 										innerClassName={classNames('m-reader-book-page', 'page-list')}
// 										columnSize={1} gapSize={4}
// 									>
// 										{this.state.activeChapterPages.map((page) => (
// 											<Card key={`${this.state.activeChapter?.index}${page.label}`}
// 												onClick={() => this.changeChapterPage(page)} className={classNames('book-page-item', { active: page.index === this.state.activePage?.index })}
// 													style={{ backgroundImage: `url(${page.url})` }}>
// 												<CardBody className="book-page-inner" style={{ textAlign: 'center' }}>
// 													<span className="book-page-label">{page.label}</span>
// 												</CardBody>
// 											</Card>
// 										))}
// 									</Listing>
// 									<div style={{ height: ReaderModule.DEFAULT_COVER_SIZE }} />
// 								</ListingScroll>
// 							</div>

// 						</div>
// 					)
// 				}
// 				<div id="reader-content" className="book-element flex-grow-1 d-flex align-items-center justify-content-center">
// 					{
// 						typeof activePage !== 'undefined' ? (
// 							<img alt="uwufication" src={activePage.url} style={{maxWidth: '100%', maxHeight: '100%'}} />
// 						) : (
// 							<div>
// 								<h3>No Preview Available</h3>
// 							</div>
// 						)
// 					}
// 				</div>
// 			</div>
// 		)
// 	}
// }


// const HeaderToggleNav = (props: {
// 	onBackClick: () => void;
// 	children: any;
// }) => (
// 	<div className="flex-full d-flex align-items-stretch border-bottom">
// 		<div className="d-flex align-items-center border-right" onClick={props.onBackClick}>
// 			<div style={{ width: 40, textAlign: 'center', fontWeight: 'bold' }}>&lt;&lt;</div>
// 		</div>
// 		<div className="flex-grow-1">
// 			<div className="flex-full d-flex flex-column align-items-center justify-content-center">
// 				{props.children}
// 			</div>
// 		</div>
// 	</div>
// )
