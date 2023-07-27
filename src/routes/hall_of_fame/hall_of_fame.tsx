import { HallOfFame } from "../../types";

import styles from "./hall_of_fame.module.css";
import { For, createSignal, onMount } from "solid-js";

const FACE_SIZE = 72;

export default function Hall() {
  const [people, setPeople] = createSignal<HallOfFame>([]);
  const [selectedPerson, setSelectedPerson] = createSignal<string | null>(null);

  onMount(async () => {
    const request = await fetch("/data/hall_of_fame.json");

    if (request.ok) {
      setPeople((await request.json()) as HallOfFame);
    } else {
      alert("An error occurred fetching hall of fame.");
    }
  });

  return (
    <>
      <header class={styles.header}>
        <div class={styles.header__text}>
          <span class={styles.header__subtext}>Bizarre Network's</span>
          <h1 class={styles.header__heading}>Hall of Fame</h1>
        </div>
      </header>
      <main class="main">
        <section class="main__section">
          <ul class={styles.fameList}>
            <For each={people()}>
              {(person) => (
                <li
                  class={`${styles.fameList__item} ${selectedPerson() != null && selectedPerson() !== person.uuid ? styles.notSelected : ""}`}
                  onMouseEnter={() => setSelectedPerson(person.uuid)}
                  onMouseLeave={() => setSelectedPerson(null)}
                >
                  <div class={styles.fameList__background}></div>
                  <div class={styles.fameList__content}>
                    <h3 class={styles.fameList__name}>{person.name}</h3>

                    <img
                      src={`https://crafatar.com/avatars/${person.uuid}?overlay&size=${FACE_SIZE}`}
                      alt={`${person.name}'s Minecraft face`}
                      class={styles.fameList__img}
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
