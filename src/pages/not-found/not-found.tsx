import { useNavigate } from "react-router-dom";
import styles from './not-found.module.css';

export const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <section className={styles.main}>
            <h2 className="text text_type_main-large mb-5">404</h2>
            <p className="text text_type_main-medium mb-5">Страница не найдена</p>
            <button onClick={() => navigate(-1)} className={styles.link + ' text text_type_main-default'}>Назад</button>
        </section>
    )
}