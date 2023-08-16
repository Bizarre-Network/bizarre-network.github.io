import { For, createSignal, onMount } from "solid-js";
import styles from "./index.module.css";

import joinBanner from "/assets/images/join_banner.png";

const cards = [
  {
    image: {
      url: new URL("/assets/images/cube.png", import.meta.url).href,
      alt: "Cube",
    },
    title: "Fun SMP-style",
    text: "Best for individuals who seek a fun and interactive SMP-style gameplay.",
  },
  {
    image: {
      url: new URL("/assets/images/hands.png", import.meta.url).href,
      alt: "Handshake",
    },
    title: "New players welcome",
    text: "Currently we are transitioning from Season 5 to Season 6. If you're interested in joining our community for the upcoming season, you are more than welcome to do so! (It is planned to be the best season by far with more players and more content for the player base with events and such).",
  },
  {
    image: {
      url: new URL("/assets/images/hammer.png", import.meta.url).href,
      alt: "Ban hammer",
    },
    title: "Active moderation",
    text: "We have had many seasons so far and are actively aiming to improve every season. The server has rules to ensure that PVP is fair, running from fights is harder and the server has an anti-cheat to ensure players aren't using hacks and etc. Fights happen regularly and they're is always lots of action to be a part of so the server stays active and interesting.",
  },
  {
    image: {
      url: new URL("/assets/images/na.png", import.meta.url).href,
      alt: "North America",
    },
    title: "North America",
    text: "The Server Host is located in NA which we find is the best Location for our players.",
  },
];

export default function IndexPage() {
  const [htmlCards, setHtmlCards] = createSignal<HTMLLIElement[]>([]);

  onMount(() => {
    for (let i = 0; i < htmlCards().length; ++i) {
      const target = htmlCards()[i];

      target.addEventListener("mousemove", (event) => {
        for (const card of htmlCards()) {
          const rect = card.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;

          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
        }
      });
    }
  });

  return (
    <>
      <header class={styles.header}>
        <div class={styles.header__text}>
          <h1 class={styles.header__heading}>Bizarre Network</h1>
          <p class={styles.header__subtitle}>Minecraft PVP SMP</p>
        </div>
        <div class={styles.header__btns}>
          <a href="https://discord.gg/bizarresmp" target="_blank" rel="noopener noreferrer">
            <button class={`${styles.header__btn} ${styles.mainBtn}`} tabIndex={-1}>
              Join Now
            </button>
          </a>
          <a href="#about">
            <button class={styles.header__btn} tabIndex={-1}>
              See info
            </button>
          </a>
        </div>
      </header>
      <main class="main">
        <section class={`main__section ${styles.about}`} id="about">
          <h2 class="main__heading">Welcome to the Bizarre SMP</h2>

          <ul class={styles.about__list}>
            <For each={cards}>
              {(card) => (
                <li class={styles.about__item} ref={(card) => setHtmlCards((cards) => [...cards, card])}>
                  <div class={styles.about__content}>
                    <img src={card.image.url} alt={card.image.alt} class={styles.about__img} />

                    <h3 class={styles.about__title}>{card.title}</h3>
                    <p class="main__paragraph">{card.text}</p>
                  </div>
                </li>
              )}
            </For>
          </ul>
        </section>
        <section class={`main__section ${styles.joinCta}`}>
          <img src={joinBanner} alt="Bizarre Network: Join Now!" class={styles.joinCta__img} />

          <a href="https://discord.gg/bizarresmp" class={styles.joinCta__link} target="_blank" rel="noopener noreferrer" tabIndex={-1}>
            <button class={styles.joinCta__btn}>
              <p class={styles.joinCta__content}>Join</p>
            </button>
            <div class={styles.joinCta__btnBorderGlow} aria-hidden="true"></div>
            <div class={styles.joinCta__btnShadow} aria-hidden="true"></div>
            <div class={styles.joinCta__btnPulser} aria-hidden="true"></div>
          </a>
        </section>
      </main>
    </>
  );
}
