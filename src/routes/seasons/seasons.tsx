import { For, createSignal, onCleanup, onMount } from "solid-js";
import { createIntersectionObserver } from "@solid-primitives/intersection-observer";
import styles from "./seasons.module.css";
import { Seasons } from "../../types";

export default function SeasonsPage() {
  const [scrolling, setScrolling] = createSignal(true);
  const [seasons, setSeasons] = createSignal<Seasons>([]);
  const [seasonItems, setSeasonItems] = createSignal<HTMLLIElement[]>([]);
  const [seasonJumperItems, setSeasonJumperItems] = createSignal<HTMLLIElement[]>([]);

  let isScrolling: NodeJS.Timeout | null = null;

  function scroll() {
    if (isScrolling) clearTimeout(isScrolling);

    isScrolling = setTimeout(() => {
      setScrolling(false);
    }, 125);
  }

  onMount(async () => {
    document.querySelector("html")!.classList.add(styles.seasonHtmlScroll);

    window.addEventListener("scroll", scroll, false);

    const seasonsRequest = await fetch(new URL("/data/seasons.json", import.meta.url).href);

    if (seasonsRequest.ok) {
      setSeasons(((await seasonsRequest.json()) as Seasons).sort((a, b) => b.season - a.season));

      setTimeout(() => {
        if (location.hash) {
          const element = document.querySelector(location.hash);
          if (element) {
            element.scrollIntoView();
          } else {
            location.hash = "";
          }
        }
      }, 0);
    } else {
      alert("An error occurred fetching season info.");
    }
  });

  onCleanup(() => {
    document.querySelector("html")!.classList.remove(styles.seasonHtmlScroll);
    window.removeEventListener("scroll", scroll);
    if (isScrolling) clearTimeout(isScrolling);
  });

  createIntersectionObserver(
    seasonItems,
    (entries) => {
      entries.forEach((entry) => {
        const index = seasonItems().findIndex((element) => element === entry.target);

        if (entry.isIntersecting) {
          entry.target.classList.add(styles.seasons__seasonViewing);
          const jumperElement = seasonJumperItems()[index];
          jumperElement.classList.add(styles.seasons__jumperBtnActive);

          if (!scrolling()) {
            jumperElement.parentElement!.scrollTo({
              left: jumperElement.offsetLeft - (jumperElement.parentElement!.getBoundingClientRect().width - jumperElement.getBoundingClientRect().width) / 2,
              top: jumperElement.offsetTop - (jumperElement.parentElement!.getBoundingClientRect().height - jumperElement.getBoundingClientRect().height) / 2,
            });
          }
        } else {
          entry.target.classList.remove(styles.seasons__seasonViewing);
          seasonJumperItems()[index].classList.remove(styles.seasons__jumperBtnActive);
        }
      });
    },
    {
      threshold: 0,
      rootMargin: "-49% 0% -49% 0%",
    }
  );

  return (
    <>
      <header class="header">
        <div class="header__text">
          <span class="header__subtext">Bizarre Network's</span>
          <h1 class="header__heading">Seasons</h1>
        </div>
      </header>
      <main class="main">
        <section class={`main__section ${styles.main__seasonsSection}`}>
          <ul class={styles.seasons}>
            <For each={seasons()}>
              {(season) => (
                <li class={styles.seasons__season} id={`season-${season.season}`} ref={(element) => setSeasonItems((value) => [...value, element])}>
                  <h2 class={styles.season__title}>Season {season.season}</h2>

                  <p class={styles.season__text}>{season.description}</p>
                </li>
              )}
            </For>
          </ul>
          <aside class={styles.seasons__selector}>
            <ul class={styles.seasons__list}>
              <For each={seasons()}>
                {(season) => (
                  <li class={styles.seasons__jumper} ref={(element) => setSeasonJumperItems((value) => [...value, element])}>
                    <a class={styles.seasons__jumperBtn} href={`#season-${season.season}`} onClick={() => setScrolling(true)}>
                      Season {season.season}
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </aside>
        </section>
      </main>
    </>
  );
}
