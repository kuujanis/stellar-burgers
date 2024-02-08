import React from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";


const ModalOverlay = (props) => {
  function overlayClick() {props.setModalActive(false)}
  return <div className={styles.modal_overlay} onClick={overlayClick}/>;
};

ModalOverlay.propTypes = {
	setModalActive: PropTypes.func.isRequired
};
export default ModalOverlay;