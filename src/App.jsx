import { RouterProvider } from "react-router";
import router from "./routes";
import SessionContextProvider from "./context/SessionContextProvider";

function App() {
  return <RouterProvider router={router}/>
}

function Root() {
  return (
    <SessionContextProvider>
      <App/>
    </SessionContextProvider>
  );
}

export default Root
