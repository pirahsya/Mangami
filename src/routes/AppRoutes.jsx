import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Detail from "../pages/Detail";
import MyList from "../pages/MyList";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/manga/:id" element={<Detail />} />
      <Route path="/my-list" element={<MyList />} />
    </Routes>
  );
}
