import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { FavoritesRepositories } from "./pages/FavoritesRepositories";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="overflow-hidden bg-slate-100">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/favorites" element={<FavoritesRepositories />}></Route>
      </Routes>
    </div>
  );
}

export default App;
