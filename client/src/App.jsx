import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Navbar />

      <ToastContainer />

      <main className="max-h-[calc(100vh-70px)]  overflow-hidden">
        <Outlet />
      </main>
    </>
  );
}

export default App;
