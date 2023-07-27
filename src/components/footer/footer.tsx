import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer class={styles.footer}>
      <ul class={styles.footer__links}>
        <li class={styles.footer__item}>
          <a href="/" class={styles.footer__link}>
            <img src="/assets/images/logo_trans256.png" alt="Bizarre logo" width={128} height={128} />
          </a>
        </li>
        <li class={styles.footer__item}>
          <h3 class={styles.footer__title}>Pages</h3>

          <ul class={styles.footer__list}>
            <li class={styles.footer__item}>
              <a href="/pages/hall-of-fame/" class={styles.footer__link}>
                Hall of Fame
              </a>
            </li>
            <li class={styles.footer__item}>
              <a href="/pages/seasons/" class={styles.footer__link}>
                Seasons
              </a>
            </li>
          </ul>
        </li>
        <li class={styles.footer__item}>
          <h3 class={styles.footer__title}></h3>
        </li>
      </ul>

      <p class={styles.footer__copyright}>
        &copy; Bizarre Network <span>{new Date().getFullYear()}</span>
      </p>
    </footer>
  );
}
