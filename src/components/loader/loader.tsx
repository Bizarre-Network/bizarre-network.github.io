import styles from "./loader.module.css";

export default function Loader() {
  return (
    <div class={styles.loader} id="loader">
      <img src="/assets/images/spinner128.png" width={128} height={128} alt="Loading" class={styles.loader__img} />
    </div>
  );
}
