import { For, onMount } from "solid-js";
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
    text: "Currently we are transitioning from Season 4 to Season 5. If you're interested in joining our community for the upcoming Season 5, you are more than welcome to do so! (It is planned to be the best season by far with more players and more content for the player base with events and such).",
  },
  {
    image: {
      url: new URL("/assets/images/hammer.png", import.meta.url).href,
      alt: "Ban hammer",
    },
    title: "Active moderation",
    text: "We have had many season so far but we are trying to make Season 5 are best. The server has rules to ensure the balance and pvp are due-able, running from fights is harder and the server has an anti-cheat to ensure players aren't using hacks and etc. Fights happen regularly and their is always lots of action to be apart of the server stays active and interesting.",
  },
  {
    image: {
      url: new URL("/assets/images/na.png", import.meta.url).href,
      alt: "North America",
    },
    title: "North America",
    text: "The Server Host Is NA which we find is the best Location for are Group of Players.",
  },
];

export default function Index() {
  const cardsRefs = new Array(cards.length).fill(null);

  onMount(() => {
    for (let i = 0; i < cardsRefs.length; ++i) {
      const target = cardsRefs[i] as HTMLLIElement;

      target.addEventListener("mousemove", (event) => {
        for (const card of cardsRefs) {
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
          <p class={styles.header__subtitle}>Light description here</p>
        </div>
        <div class={styles.header__btns}>
          <a href="https://discord.gg/bizarresmp" target="_blank" rel="noopener noreferrer">
            <button class={`${styles.header__btn} ${styles.mainBtn}`}>Join Now</button>
          </a>
          <a href="#about">
            <button class={styles.header__btn}>See info</button>
          </a>
        </div>
      </header>
      <main class={"main"}>
        <section class={`${"main__section"} ${styles.about}`} id="about">
          <h2 class={"main__heading"}>Welcome to the Bizarre SMP</h2>

          <ul class={styles.about__list}>
            <For each={cards}>
              {(card, i) => (
                <li class={styles.about__item} ref={cardsRefs[i()]}>
                  <div class={styles.about__content}>
                    <img src={card.image.url} alt={card.image.alt} class={styles.about__img} />

                    <h3 class={styles.about__title}>{card.title}</h3>
                    <p class={"main__paragraph"}>{card.text}</p>
                  </div>
                </li>
              )}
            </For>
          </ul>
        </section>
        <section class={`${"main__section"} ${styles.joinCta}`}>
          <img src={joinBanner} alt="Bizarre join banner" class={styles.joinCta__img} />

          <a href="https://discord.gg/bizarresmp" target="_blank" rel="noopener noreferrer">
            <button class={styles.joinCta__btn}>Join</button>
          </a>
        </section>
      </main>
    </>
  );
}
