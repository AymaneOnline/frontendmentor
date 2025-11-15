import ResultScore from "./ResultScore";
import styles from "./Result.module.scss";

export default function Result({scoreItems}) {
    return (
        <div className={styles["result__container"]}>
            <h1 className={styles["result__title"]}>Your Result</h1>
            <ResultScore scoreItems={scoreItems} />
            <p className={styles["result__paragraph"]}>
                <span className={styles["result__comment"]}>Great</span>
                You scored higher than 65% of the people who have taken these tests.
            </p>
        </div>
    );
}