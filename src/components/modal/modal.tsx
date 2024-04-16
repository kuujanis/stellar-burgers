import { ReactNode, useEffect, FC } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

type TModal = {
	closeModal: () => void,
	children: ReactNode,
	header?: string
}
const root = document.querySelector('#modal-root') as HTMLDivElement

const Modal: FC<TModal> = ({closeModal, children, header}) => {


	useEffect(() => {
		const onEscDown = (evt: KeyboardEvent) => (evt.key === "Escape") && closeModal();
		document.addEventListener('keydown', onEscDown);
		return () => {
			document.removeEventListener('keydown', onEscDown);
		}
	}, []);
	
    return ReactDOM.createPortal(
		
	    <div className={styles.modal_overlay}>
			<ModalOverlay closeModal={closeModal}/>
	        <div className={styles.modal} onClick={e=>e.stopPropagation()}>       
		        <div className={styles.modal_title}>
					<span className="text text_type_main-medium">{header}</span>
			       
            			<CloseIcon type="primary" onClick={closeModal}/>
          			
		        </div>
				<div className='mt-10'>
					{children}
				</div>
		        
	        </div>
			
        </div>,
        root
    );
}

export default Modal