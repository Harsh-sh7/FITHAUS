import { RouterProvider } from "react-router";
import { router } from "./routes";
import { LoadingScreen } from "./components/LoadingScreen";

export default function App() {
  return (
    <>
      <LoadingScreen />
      <RouterProvider router={router} />
    </>
  );
}