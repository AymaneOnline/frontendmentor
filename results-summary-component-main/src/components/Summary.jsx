import SummaryList from "./SummaryList";
import ContinueButton from "./ContinueButton";
import styles from "./Summary.module.scss";

export default function Summary({scoreItems}) {
    return (
        <div className={styles["summary__container"]}>
            <h1 className={styles["summary__title"]}>Summary</h1>
            <SummaryList scoreItems={scoreItems} />
            <ContinueButton />
        </div>
    );
}