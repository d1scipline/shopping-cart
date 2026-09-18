import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      <h1 className={styles.heading}>Welcome to Our Simple Shop</h1>
      <div className={styles.mainContainer}>
        <img
          className={styles.image}
          alt="Featured store items"
          src="https://picsum.photos/400"
        ></img>
        <div className={styles.subContainer}>
          <h2 className={styles.header}>Best products that money can buy</h2>
          <p className={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </>
  );
}
