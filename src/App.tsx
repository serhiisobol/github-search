import { Route, Routes } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { FavoritesPage } from "./pages/FavoritesPage";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/favorites" element={<FavoritesPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
