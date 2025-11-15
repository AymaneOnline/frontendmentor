import SummaryItem from "./SummaryItem";
import styles from "./SummaryList.module.scss";

export default function SummaryList({scoreItems}) {
    return (
        <ul className={styles["summary__list"]}>
            {scoreItems.map(scoreItem => (
                <SummaryItem
                key={scoreItem.category}
                icon={scoreItem.icon}
                category={scoreItem.category}
                score={scoreItem.score} />
            ))}
        </ul>
    );
}