import { Route, Routes } from "@solidjs/router";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import IndexPage from "./routes/index";
import ErrorBoundary from "./routes/error/error";
import HallOfFamePage from "./routes/hall_of_fame/hall_of_fame";
import SeasonsPage from "./routes/seasons/seasons";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/hall-of-fame" element={<HallOfFamePage />} />
        <Route path="/seasons" element={<SeasonsPage />} />
        <Route path="/" element={<ErrorBoundary />} />
      </Routes>

      <Footer />
    </>
  );
}
