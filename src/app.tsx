import { Route, Routes, useLocation } from "@solidjs/router";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import IndexPage from "./routes/index";
import HallOfFamePage from "./routes/hall_of_fame/hall_of_fame";
import SeasonsPage from "./routes/seasons/seasons";
import { ErrorBoundary, createEffect } from "solid-js";
import ErrorPage from "./routes/error/error";

export default function App() {
  const location = useLocation();

  createEffect(() => {
    location.pathname;

    document.activeElement instanceof HTMLElement && document.activeElement.blur();
  });

  return (
    <ErrorBoundary fallback={(error: Error) => <ErrorPage error={error} location={location} />}>
      <Navbar location={location} />

      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/hall-of-fame" element={<HallOfFamePage />} />
        <Route path="/seasons" element={<SeasonsPage />} />
      </Routes>

      <Footer />
    </ErrorBoundary>
  );
}
