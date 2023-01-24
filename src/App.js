import { useEffect, useState } from "react";
import  { Toaster } from 'react-hot-toast';
import { Route, Routes } from "react-router-dom";
import { getEtheriumContract, isWallectConnected, listProduct } from "./Blockchain.services";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Orders from "./components/Orders";
import Product from "./components/Product";

function App() {
  const [loaded, setLoaded] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      await isWallectConnected();
      await listProduct()
      await getEtheriumContract()
    }
    loadData()
  }, [])

  return (
    <div >
      <NavBar/>
      {loaded ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product/>} />
          <Route path="/orders" element={<Orders/>} />
  
        </Routes>
      ) : null}
      <Toaster />
    </div>
  );
}

export default App;
