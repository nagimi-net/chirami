import React, { Component, Fragment, HTMLAttributes } from 'react'
import classNames from 'classnames'

import './Logger.scss'

interface LoggerProps extends Pick<HTMLAttributes<HTMLDivElement>, 'style' | 'className' | 'children'> {
	list: string[];
}

interface LoggerState {
	show: boolean;
	list: string[];
}


export default class Logger extends Component<LoggerProps, LoggerState> {
	constructor(props: Readonly<LoggerProps>) {
		super(props);

		const list = [...props.list];
		list.reverse();

		this.state = {
			show: (props.list.length > 0),
			list,
		}
	}
	render() {

		if (!this.state.show) return null;

		return (
			<Fragment>
				<div className={classNames('c-logger')} onClick={() => this.setState({show: false})}>
					{this.state.list.map(str => <code key={str}>{'-' + str}</code>)}
				</div>
			</Fragment>
		)
	}
}
