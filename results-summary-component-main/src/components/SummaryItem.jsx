import styles from "./SummaryItem.module.scss";

export default function SummaryItem({icon, category, score}) {
    return (
        <li className={`${styles["summary__item"]} ${styles[`summary__item-${category.toLowerCase()}`]}`}>
            <div className={styles[`summary__item-content`]}>
                <img src={icon} alt={"Icon representing " + category} />
                <span>{category}</span>
            </div>
            <div className={styles["summary__item-rate"]}>
                <span className={styles["summary__item-score"]}>{score + ' '}</span>
                / 100
            </div>
        </li>
    );
}