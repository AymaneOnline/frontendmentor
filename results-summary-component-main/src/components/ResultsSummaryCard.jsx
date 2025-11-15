import Result from "./Result";
import Summary from "./Summary";
import styles from "./ResultSummaryCard.module.scss";

export default function ResultsSummaryCard({scoreItems}) {
    return (
        <div className={styles["result-summary-card"]}>
            <Result scoreItems={scoreItems} />
            <Summary scoreItems={scoreItems} />
        </div>
    );
}