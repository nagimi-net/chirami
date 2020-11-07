import React, { Component } from 'react'
import classNames from 'classnames'
import Listing, { ListingScroll } from '../../components/Listing'
import { RestrictionType, SourceManager, SourceOptions } from '../../interfaces/Source'
import Card, { CardBody } from '../../components/Card'
import './Source.scss'

interface SourceProps {
	// any
}

interface SourceState {
	source_list: SourceOptions[];
}

export default class SourceModule extends Component<SourceProps, SourceState> {
	constructor(props: Readonly<any>) {
		super(props);

		this.state = {
			source_list: [],
		}
	}

	componentDidMount = (): void => {
		const list = SourceManager.LIST;
		const devs = list.filter(e => !!e.label.find(f => f == RestrictionType.DEV));
		const norm = list.filter(e => !e.label.find(f => f == RestrictionType.DEV));
		this.setState({ source_list: [
			...norm,
			...devs,
		] });
	}

	render(): JSX.Element {
		return (
			<div className={classNames('m-source')}>
				<ListingScroll>
					<Listing
						columnSize={1} gapSize={4}
					>
						{this.state.source_list.map((data) => (
							<Card key={data.id} className="source-item" style={data.backdrop_color ? { backgroundColor: data.backdrop_color } : undefined}>
								<CardBody className="source-inner d-flex align-items-center justify-content-center">
									<img className="source-logo" src={data.logo} title={data.id} />
								</CardBody>
							</Card>
						))}
					</Listing>
				</ListingScroll>
			</div>
		)
	}
}
