import { useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import { dataContext } from '../../context';


const Modal = (props) => {
	useEffect(() => {
		const onEscDown = (evt) => (evt.key === "Escape") && props.setModalActive(false);
		document.addEventListener('keydown', onEscDown);
		return () => {
			document.removeEventListener('keydown', onEscDown);
		}
	}, [props]);
	

    return ReactDOM.createPortal(
		
	    <div className={styles.modal_overlay}>
			<ModalOverlay setModalActive={props.setModalActive}/>
	        <div className={styles.modal} onClick={e=>e.stopPropagation()}>       
		        <div className={styles.modal_title}>
					<span className="text text_type_main-medium">{props.header}</span>
			       
            			<CloseIcon type="primary" onClick={()=>props.setModalActive(false)}/>
          			
		        </div>
				<div className='mt-10'>
					{props.children}
				</div>
		        
	        </div>
		
        </div>,
        document.querySelector('#modal-root')
    );
}

ModalOverlay.propTypes = {
	setModalActive: PropTypes.func,
	children: PropTypes.node
};


export default Modal