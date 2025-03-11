import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router";
import Markup from "../layout";
import Home from "../pages/Home";
import Genre from "../pages/Genre";
import Game from "../pages/Game";
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Markup />}>
        <Route path="/" element={<Home />}/>
        <Route path="/game/genre" element={<Genre />}/>
        <Route path="/game/game-name" element={<Game />}/>
      </Route>
    )
  );

  export default router;