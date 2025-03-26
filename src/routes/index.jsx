import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  Outlet,
} from "react-router";
import { useContext } from "react";
import Markup from "../layout";
import Home from "../pages/Home";
import Genre from "../pages/Genre";
import Platforms from "../pages/Platforms";
import Game from "../pages/Game";
import Signup from "../pages/Auth/Signup";
import Signin from "../pages/Auth/Signin";
import Account from "../pages/Auth/Account";
import SessionContext from "../context/SessionContext";
import Search from "../pages/Search";

export function ProtectedRoute() {
  const session = useContext(SessionContext);
  console.log("Sessione dell'utente loggato: ", session);

  if (!session) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Markup />}>
      <Route path="/" element={<Home />} />
      <Route path="/games/:genre" element={<Genre />} />
      <Route path="/search" element={<Search/>}/>
      <Route path="/platforms/:platform" element={<Platforms />} />
      <Route path="/game/:id/:game" element={<Game />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/account" element={<Account />} />
      </Route>
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Signin />} />
    </Route>
  )
);

export default router;
