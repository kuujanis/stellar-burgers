import {FC} from "react";
import styles from "./modal-overlay.module.css";

type TModalOverlay = {
  closeModal: () => void
}

const ModalOverlay: FC<TModalOverlay> = ({closeModal}) => {
  return <div className={styles.modal_overlay} onClick={closeModal}/>;
};

export default ModalOverlay;