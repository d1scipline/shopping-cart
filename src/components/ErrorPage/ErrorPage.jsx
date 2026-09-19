import { CircleX } from "lucide-react";
import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Error!</h1>
      <CircleX className={styles.icon} />
      <p className={styles.paragraph}>
        We're sorry, there has been an error. Please try again later.
      </p>
    </div>
  );
}
