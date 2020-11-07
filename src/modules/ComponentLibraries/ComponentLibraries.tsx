import React, { Component } from 'react'
import './ComponentLibraries.scss'

import CardComponent from './components/CardComponent'
import FormComponent from './components/FormComponent'

export default class ComponentLibraries extends Component {
	render(): JSX.Element {
		return (
			<div className="m-component-libraries">
				<ComponentRegion label="Cards">
					<CardComponent />
				</ComponentRegion>
				<ComponentRegion label="Forms">
					<FormComponent />
				</ComponentRegion>
			</div>
		)
	}
}


const ComponentRegion = (props: {
	children: any,
	label: string
}) => (
	<div>
		<p>{props.label}</p>
		<div>
			{props.children}
		</div>
	</div>
)
