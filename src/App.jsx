import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ThemeProvider } from "./components/ThemeProvider";
import Home from "./pages/Home";
import ListingPage from "./pages/ListingPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col bg-white dark:bg-slate-900 text-foreground px-10">
        <Header />
        <main className="flex-1 container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listing/:id" element={<ListingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
