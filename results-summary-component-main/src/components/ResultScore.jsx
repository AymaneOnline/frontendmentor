import styles from './ResultScore.module.scss';

export default function ResultScore({scoreItems}) {
    const result = Math.round(
        scoreItems.reduce((total, scoreItem) => total + scoreItem.score, 0) / scoreItems.length
    );

    return (
        <div className={styles["result__rate"]}>
            <span className={styles["result__score"]}>{result}</span>
            of 100
        </div>
    );
}