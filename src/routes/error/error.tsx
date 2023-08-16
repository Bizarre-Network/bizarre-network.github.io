import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { Location } from "@solidjs/router";

// import styles from "./error.module.css";

// function statusToMessage(status: number, internal: boolean, defaultMsg: string): string {
//   if (internal) {
//     switch (status) {
//       case 404:
//         return "No page with the URL given found.";
//         break;
//       default:
//         return defaultMsg;
//     }
//   } else {
//     return defaultMsg;
//   }
// }

export default function ErrorPage({ error, location }: { error: Error; location: Location }) {
  return (
    <>
      <Navbar location={location} />

      <main class="main">
        <h1 class="main__heading">Fatal Error</h1>
        <p class="main__paragraph">{error.message}</p>
      </main>

      <Footer />
    </>
  );
}
