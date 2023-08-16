import { HallOfFame } from "../../types";

import styles from "./hall_of_fame.module.css";
import { For, createSignal, onMount } from "solid-js";

const FACE_SIZE = 72;

export default function HallOfFamePage() {
  const [people, setPeople] = createSignal<HallOfFame>([]);
  const [selectedPerson, setSelectedPerson] = createSignal<string | null>(null);

  onMount(async () => {
    const request = await fetch(new URL("/data/hall_of_fame.json", import.meta.url).href);

    if (request.ok) {
      setPeople((await request.json()) as HallOfFame);

      setTimeout(() => {
        if (location.hash) {
          const name = location.hash.slice(1);

          const element = document.querySelector(location.hash);
          if (element) {
            element.scrollIntoView({
              block: "center",
            });

            people().some((person) => {
              if (person.name !== name) return;

              setSelectedPerson(person.uuid);

              return true;
            });
          } else {
            location.hash = "";
          }
        }
      }, 0);
    } else {
      alert("An error occurred fetching hall of fame.");
    }
  });

  return (
    <>
      <header class="header">
        <div class="header__text">
          <span class="header__subtext">Bizarre Network's</span>
          <h1 class="header__heading">Hall of Fame</h1>
        </div>
      </header>
      <main class="main">
        <section class="main__section">
          <ul class={`${styles.fameList} ${selectedPerson() != null ? styles.fameListSelected : ""}`}>
            <For each={people()}>
              {(person) => (
                <li
                  class={`${styles.fameList__item} ${selectedPerson() === person.uuid ? styles.fameList__itemSelected : ""}`}
                  id={person.name}
                  style={`animation-delay: ${Math.min(200, Math.max(50, Math.random() * 200))}ms`}
                  onMouseEnter={() => setSelectedPerson(person.uuid)}
                  onMouseLeave={() => setSelectedPerson(null)}
                >
                  <div class={styles.fameList__background} aria-hidden="true"></div>
                  <div class={styles.fameList__content}>
                    <h3 class={styles.fameList__name}>{person.name}</h3>

                    <img
                      src={`https://crafatar.com/avatars/${person.uuid}?overlay&size=${FACE_SIZE}`}
                      alt={`${person.name}'s Minecraft face`}
                      class={`${styles.fameList__img} ${styles.fameList__imgLoading}`}
                      onLoad={(event) => event.target.classList.remove(styles.fameList__imgLoading)}
                      width={FACE_SIZE}
                      height={FACE_SIZE}
                    />

                    <p class="main__paragraph">Seasons played: {person.seasons_played.join(", ")}</p>
                    <p class="main__paragraph">Seasons won: {person.seasons_won.join(", ")}</p>

                    <p class="main__paragraph">{person.description}</p>
                  </div>
                </li>
              )}
            </For>
          </ul>
        </section>
      </main>
    </>
  );
}
