import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Navbar />

      <ToastContainer />

      <main className="min-h-screen ">
        <Outlet />
      </main>
    </>
  );
}

export default App;
