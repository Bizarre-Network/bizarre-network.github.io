import { A, Location } from "@solidjs/router";
import styles from "./navbar.module.css";
import { createEffect, createSignal } from "solid-js";

import logo128 from "/assets/images/logo_trans128.png";

export default function Navbar({ location }: { location: Location }) {
  const [open, setOpen] = createSignal(false);

  createEffect(() => {
    location.pathname;
    setOpen((open) => (open ? !open : open));
  });

  return (
    <>
      <nav class={`${styles.navbar} ${open() ? styles.navbarMobileOpen : ""}`}>
        <ul class={styles.navbar__list}>
          <li class={`${styles.navbar__item} ${styles.logo}`}>
            <A href="/" class={styles.navbar__link}>
              <img src={logo128} alt="Bizarre Network logo" width={42} height={42} />
            </A>
          </li>
          <li class={styles.navbar__item}>
            <A href="/hall-of-fame/" class={styles.navbar__link}>
              <p class={styles.navbar__text}>Hall of Fame</p>
            </A>
          </li>
          <li class={styles.navbar__item}>
            <A href="/seasons/" class={styles.navbar__link}>
              <p class={styles.navbar__text}>Seasons</p>
            </A>
          </li>
          <li class={`${styles.navbar__item} ${styles.navbar__button}`}>
            <a href="https://discord.gg/bizarresmp" target="_blank" rel="noopener noreferrer" class={styles.navbar__link}>
              <button class={styles.navbar__btn} tabIndex={-1}>
                Join
              </button>
            </a>
          </li>
          <button class={styles.navbarMobile__deactivate} onClick={() => setOpen(false)} title="Close sidebar"></button>
        </ul>
      </nav>
      <nav class={styles.navbarMobile}>
        <ul class={styles.navbar__list}>
          <li class={`${styles.navbar__item} ${styles.navbar__mobileButton}`}>
            <button class={styles.navbar__btn} onClick={() => setOpen((open) => !open)} title="Toggle sidebar">
              <i class="fa-regular fa-bars"></i>
            </button>
          </li>
          <li class={`${styles.navbar__item} ${styles.logo}`}>
            <A href="/" class={styles.navbar__link}>
              <img src={logo128} alt="Bizarre Network logo" width={42} height={42} />
            </A>
          </li>
          <li class={`${styles.navbar__item} ${styles.navbar__button}`}>
            <a href="https://discord.gg/bizarresmp" target="_blank" rel="noopener noreferrer" class={styles.navbar__link}>
              <button class={styles.navbar__btn}>Join</button>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
