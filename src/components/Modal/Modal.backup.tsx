// import React, { Component, HTMLAttributes } from 'react'
// import classNames from 'classnames'
// import Card, { CardBody } from '../Card';

// type Props = Pick<Omit<HTMLAttributes<HTMLDivElement>, 'children'>, 'className' | 'style' | 'onClick' | 'onScroll'>

// interface IModalProps {
// 	modalId: string;
// }

// interface IModalState {
// 	modalOpen: boolean;
// 	modalContent: any;
// }

// interface ModalContext {
// 	setItem: (body: any) => void;
// 	close: () => void;
// }

// export class ModalManager {
// 	static Context: { [key: string]: Modal } = {};
// 	static GetContext(key: string) {
// 		if (typeof ModalManager.Context[key] !== 'undefined') {
// 			return ModalManager.Context[key];
// 		}
// 	}
// 	static Add(key: string, modal: Modal) {
// 		ModalManager.Context[key] = modal;
// 	}
// 	static Rem(key: string) {
// 		delete ModalManager.Context[key];
// 	}

// 	static Show(key: string) {
// 		ModalManager.GetContext(key)?.open();
// 	}
// 	static Hide(key: string) {
// 		ModalManager.GetContext(key)?.close();
// 	}
// }

// export class Modal extends Component<Partial<IModalProps> & Props, IModalState> {

// 	static defaultProps: Partial<IModalProps> = {
// 		modalId: 'global'
// 	}

// 	constructor(props: Readonly<Partial<IModalProps> & Props>) {
// 		super(props);

// 		this.state = {
// 			modalOpen: false,
// 			modalContent: undefined,
// 		}
// 	}



// 	componentDidMount() {
// 		const { modalId } = this.props;
// 		ModalManager.Add(modalId as string, this);
// 	}

// 	componentWillUnmount() {
// 		const { modalId } = this.props;
// 		ModalManager.Rem(modalId as string);
// 	}

// 	open = (callback?: ()=>void) => {
// 		this.setState({
// 			modalOpen: true,
// 		}, callback);
// 		document.body.style.overflow = 'hidden';
// 	}

// 	close = () => {
// 		this.setState({ modalOpen: false });
// 		document.body.style.overflow = 'initial';
// 	}

// 	template = (children: any) => {
// 		return <>{children}</>;
// 	}

// 	render() {
// 		const { className, children, modalId,
// 			...rest } = this.props;

// 		const {
// 			modalOpen
// 		} = this.state;

// 		if (!modalOpen) return null;

// 		return (
// 			<div className={classNames('c-modal', className)} {...rest}>
// 				<div className={'c-modal-blur'} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
// 					onClick={this.close} />
// 				<div className="d-flex align-items-center justify-content-center">
// 					<div className={classNames('c-modal-content')}>{this.template(children)}</div>
// 				</div>
// 			</div>
// 		)
// 	}
// }

// export class ModalCard extends Modal {
// 	template = (children: any) => {
// 		return (
// 			<Card className={classNames('c-modal-wrapper')}>
// 				<CardBody>
// 					<div>
// 						{children}
// 					</div>
// 				</CardBody>
// 			</Card>
// 		)
// 	}
// }


// export default Modal;
