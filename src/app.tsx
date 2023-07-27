import { Route, Routes } from "@solidjs/router";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import Index from "./routes/index";
import ErrorBoundary from "./routes/error/error";
import Hall from "./routes/hall_of_fame/hall_of_fame";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/hall-of-fame" element={<Hall />} />
        <Route path="/" element={<ErrorBoundary />} />
      </Routes>

      <Footer />
    </>
  );
}
