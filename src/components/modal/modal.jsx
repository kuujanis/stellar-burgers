import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from '../../services/actions';


const Modal = ({closeModal, children, header}) => {


	useEffect(() => {
		const onEscDown = (evt) => (evt.key === "Escape") && closeModal();
		document.addEventListener('keydown', onEscDown);
		return () => {
			document.removeEventListener('keydown', onEscDown);
		}
	}, []);
	

    return ReactDOM.createPortal(
		
	    <div className={styles.modal_overlay}>
			<ModalOverlay setModalActive={closeModal}/>
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
        document.querySelector('#modal-root')
    );
}

Modal.propTypes = {
	children: PropTypes.node.isRequired
};


export default Modal