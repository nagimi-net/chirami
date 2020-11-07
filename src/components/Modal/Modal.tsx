import React, { Component, HTMLAttributes } from 'react'
import classNames from 'classnames'
import Card, { CardBody } from '../Card';

type Props = Pick<Omit<HTMLAttributes<HTMLDivElement>, 'children'>, 'className' | 'style'>

interface IModalProps extends Props{
	toggle: boolean;

	onBlur?: () => void;
}

interface IModalState {
	modalOpen: boolean;
}

export class Modal extends Component<IModalProps, IModalState> {
	constructor(props: Readonly<IModalProps>) {
		super(props);

		this.state = {
			modalOpen: props.toggle,
		}
	}

	componentDidUpdate(prevProps: IModalProps): void {
		if (prevProps.toggle !== this.props.toggle) {
			this.toggle(this.props.toggle);
		}
	}

	toggle = (modalOpen: boolean): void => {
		this.setState({ modalOpen }, () => {
			if (modalOpen) {
				document.body.style.overflow = 'hidden';
			}
			else {
				document.body.style.overflow = 'initial';
			}
		});
	}

	onBlur = (): void => {
		if (typeof this.props.onBlur === 'function') {
			this.props.onBlur();
		}
	}

	template = (children: JSX.Element): JSX.Element => {
		return <>{children}</>;
	}

	render(): JSX.Element | null {
		const { className, children, ...rest } = this.props;
		const { modalOpen } = this.state;

		if (!modalOpen) return null;

		return (
			<div className={classNames('c-modal', className)} {...rest}>
				<div className={'c-modal-blur'} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
					onClick={this.onBlur} />
				<div className="c-modal-wrapper flex-full d-flex align-items-center justify-content-center">
					{children}
				</div>
			</div>
		)
	}
}

export class ModalCard extends Modal {
	template = (children: JSX.Element): JSX.Element => {
		return (
			<Card className={classNames('c-modal-wrapper')}>
				<CardBody>
					<div>
						{children}
					</div>
				</CardBody>
			</Card>
		)
	}
}


export default Modal;
