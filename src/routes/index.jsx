import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import Markup from "../layout";
import Home from "../pages/Home";
import Genre from "../pages/Genre";
import Game from "../pages/Game";
import Signup from "../pages/Auth/Signup";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Markup />}>
      <Route path="/" element={<Home />} />
      <Route path="/games/:genre" element={<Genre />} />
      <Route path="/game/:id/:game" element={<Game />} />
      <Route path="/register" element={<Signup />} />
    </Route>
  )
);

export default router;