// import React, { Component } from 'react'
// import classNames from 'classnames'

// import { CenteringObject, Flexing, FlexingItem } from '../../components/Layout'

// import './Reader.scss'
// import Button from '../../components/Form/Button'
// import ModulePage from '../../components/ModulePage'
// import Card, { CardBody } from '../../components/Card'
// import Listing from '../../components/Listing'
// import Modal, { ModalManager } from '../../components/Modal'

// import DataSample from './datasample.json'
// import { Book, BookChapter } from '../../interfaces/Book'
// import PageList from './PageList'


// interface ReaderModuleProps {
// 	book?: Book;
// }
// interface ReaderModuleState extends Book {
// 	coverOpacity: number;
// 	navigationHeight: number;

// 	activeChapter?: BookChapter;
// }

// export default class ReaderModule extends Component<ReaderModuleProps, ReaderModuleState> {

// 	static DEFAULT_COVER_SIZE: number = 100;

// 	constructor(props: Readonly<ReaderModuleProps>){
// 		super(props);

// 		this.state = {
// 			author: [],
// 			chapters: [],
// 			description: '',
// 			cover_image: '',
// 			chapter_count: -1,
// 			genre: [],
// 			relased: '',
// 			title: '',
// 			title_native: '',
// 			type: '',

// 			coverOpacity: 1,
// 			navigationHeight: 0,
// 			activeChapter: undefined,
// 		}
// 	}
// 	componentDidMount() {
// 		var list = [];
// 		const navigationHeight = document.getElementById('reader-navigation')?.clientHeight || 0;

// 		//this.setState({ navigationHeight, ...this.props.book });
// 		this.setState({ navigationHeight, ...(DataSample as unknown as Book) });
// 	}

// 	onChapterClick(key: string) {
// 		var chapter = this.state.chapters.find(e=>e.key === key);
// 		this.setState({ activeChapter: chapter });
// 	}

// 	onSelectSource() {
// 		ModalManager.Show('global');
// 	}

// 	onChapterScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
// 		const data = event.currentTarget;
// 		if (data.scrollTop <= ReaderModule.DEFAULT_COVER_SIZE) {
// 			this.setState({ coverOpacity: 1 - (data.scrollTop / ReaderModule.DEFAULT_COVER_SIZE) });
// 		}
// 		else {
// 			this.setState({ coverOpacity: 0 });
// 		}
// 	}

// 	render() {
// 		const scrolled = (this.state.coverOpacity == 0);
// 		return (
// 			<ModulePage className={classNames('m-reader')}>
// 				<Flexing className="m-reader-wrapper">
// 					<FlexingItem className="m-reader-menu" shrink size="300px" style={{position: 'relative'}}>
// 						<div className="m-reader-menu-cover" style={{
// 							backgroundImage: `url('${this.state.cover_image}')`,
// 							opacity: this.state.coverOpacity,
// 							height: ReaderModule.DEFAULT_COVER_SIZE + this.state.navigationHeight + 20
// 							}} />
// 						<div className="m-reader-menu-inner">
// 							<div className="m-reader-menu-shrink">
// 								<Flexing id="reader-navigation"
// 									className={classNames('m-reader-menu-item', 'navigation')}
// 									alignItems="center" justifyContent="space-between">
// 									<FlexingItem>
// 										<Button value={'Select Source'}
// 											onClick={this.onSelectSource} />
// 									</FlexingItem>
// 									<FlexingItem>
// 										<Button value={'Find Source'} />
// 									</FlexingItem>
// 								</Flexing>
// 							</div>
// 							<div className={classNames('m-reader-menu-grow', { 'border-top': scrolled })} onScroll={this.onChapterScroll}>
// 								<Listing
// 									className="chapters"
// 									innerClassName={classNames('m-reader-menu-item', 'chapter-list')}
// 									columnSize={1} gapSize={4}
// 									style={{ marginTop: ReaderModule.DEFAULT_COVER_SIZE }}
// 								>
// 									{this.state.chapters.map((chapter) => (
// 										<Card key={chapter.key}
// 											className={classNames('chapter', {active: chapter.key === this.state.activeChapter?.key})}
// 											onClick={()=>this.onChapterClick(chapter.key)}
// 										>
// 											<CardBody>
// 												<Flexing justifyContent="space-between">
// 													<FlexingItem>{chapter.label}</FlexingItem>
// 													<FlexingItem>{chapter.date}</FlexingItem>
// 												</Flexing>
// 											</CardBody>
// 										</Card>
// 									))}
// 								</Listing>
// 							</div>
// 						</div>
// 					</FlexingItem>
// 					<FlexingItem className="m-reader-page">
// 						{
// 							(typeof this.state.activeChapter !== 'undefined') && (
// 								<PageList chapter={this.state.activeChapter as BookChapter} />
// 							)
// 						}
// 					</FlexingItem>
// 					<FlexingItem className="m-reader-content" grow>
// 						<CenteringObject horizontal vertical>
// 							<img src="https://s6.mangabeast01.com/manga/Spy-X-Family/0035-001.png" style={{ maxWidth: '100%', maxHeight: '100%' }} />
// 						</CenteringObject>
// 					</FlexingItem>
// 				</Flexing>
// 			</ModulePage>
// 		)
// 	}
// }
