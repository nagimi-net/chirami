// import React, { Component } from 'react'
// import classNames from 'classnames'

// import './Dashboard.scss'
// import Button from '../../components/Form/Button'
// import ModulePage from '../../components/ModulePage'
// import Card, { CardBody } from '../../components/Card'
// import Listing from '../../components/Listing'
// import Modal, { ModalManager } from '../../components/Modal'


// export default class DashboardModule extends Component<any,any> {
// 	constructor(props: Readonly<any>){
// 		super(props);

// 		this.state = {
// 			list: []
// 		}
// 	}
// 	componentDidMount() {
// 		var list = [];
// 		for(var i = 0; i < 25; i++) {
// 			list.push(i);
// 		}
// 		this.setState({ list });
// 	}

// 	onSelectSource() {
// 		ModalManager.Show('global');
// 	}

// 	render() {
// 		return (
// 			<ModulePage className={classNames('m-dashboard')}>
// 				<Flexing className="m-dashboard-wrapper">
// 					<FlexingItem className="m-dashboard-menu" shrink size="300px">
// 						<div className="m-dashboard-menu-shrink">
// 							<Flexing className="m-dashboard-menu-item"
// 								alignItems="center" justifyContent="space-between">
// 								<FlexingItem>
// 									<Button value={'Select Source'}
// 										onClick={this.onSelectSource} />
// 								</FlexingItem>
// 								<FlexingItem>
// 									<Button value={'Find Source'} />
// 								</FlexingItem>
// 							</Flexing>
// 						</div>
// 						<div className="m-dashboard-menu-grow">
// 							<Listing className="m-dashboard-menu-item" columnSize={2} gapSize={4}>
// 								{this.state.list.map((e: number) => (
// 									<Card key={e.toString()}>
// 										<CardBody>
// 											Eps {e}
// 										</CardBody>
// 									</Card>
// 								))}
// 							</Listing>
// 						</div>
// 					</FlexingItem>
// 					<FlexingItem className="m-dashboard-content" grow>
// 						<CenteringObject horizontal vertical>
// 							<h1>Hello World</h1>
// 						</CenteringObject>
// 					</FlexingItem>
// 				</Flexing>
// 			</ModulePage>
// 		)
// 	}
// }

export default {}
