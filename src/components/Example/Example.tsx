import React, { HTMLAttributes } from 'react'
import classNames from 'classnames'

type ExampleProps = Pick<HTMLAttributes<HTMLDivElement>, 'style' | 'className' | 'children'>

export const Example = ({
	className,
	children,
	...rest
}: Partial<ExampleProps>): JSX.Element => (
	<div className={classNames('c-example', className)} {...rest}>
		{children}
	</div>
)

export default Example;
// export class Example extends Component<ExampleProps> {
// 	render() {
// 		return (
// 			<Fragment>
// 				<div className={classNames('c-example')}>
// 					<ol>
// 						<li>Melambai-lambai nyiur di pantai</li>
// 						<li>Berbisik-bisik raja klana</li>
// 						<li>Memuja pulau nan indah permai</li>
// 						<li>Tanah airku Indonesia</li>
// 					</ol>
// 				</div>
// 			</Fragment>
// 		)
// 	}
// }
