import { Loader } from "lucide-react";
import styles from "./LoadingPage.module.css";

export default function LoadingPage() {
  return (
    <div role="status" aria-live="polite" className={styles.container}>
      <h1 className={styles.heading}>Loading...</h1>
      <Loader className={styles.icon} aria-hidden="true"></Loader>
      <p className={styles.paragraph}>Preparing your curated shop...</p>
    </div>
  );
}
