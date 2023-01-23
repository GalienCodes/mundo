import { useEffect, useState } from "react";
import  { Toaster } from 'react-hot-toast';
import { Route, Routes } from "react-router-dom";
import { getEtheriumContract, isWallectConnected, listProduct } from "./Blockchain.services";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Product from "./components/Product";

function App() {
  const [loaded, setLoaded] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      await isWallectConnected();
      await getEtheriumContract()
      await listProduct()
    }
    loadData()
  }, [])

  return (
    <div >
      <NavBar/>
      {loaded ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proposal/:id" element={<Product/>} />
        </Routes>
      ) : null}
      <Toaster />
    </div>
  );
}

export default App;
