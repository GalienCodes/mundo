import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { isWallectConnected } from "./Blockchain.services";
import NavBar from "./components/NavBar";

function App() {

  useEffect(async () => {
   console.log('hello');
  }, [])

  return (
    <div >
      <NavBar/>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
