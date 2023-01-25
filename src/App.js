import { useEffect, useState } from "react";
import  { Toaster } from 'react-hot-toast';
import { Route, Routes } from "react-router-dom";
import { fetchOrders, getEtheriumContract, isWallectConnected, listProduct } from "./Blockchain.services";
import About from "./components/About";
import Admin from "./components/Admin";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Orders from "./components/Orders";
import Product from "./components/Product";
import { useGlobalState } from "./store";

function App() {
  const [loaded, setLoaded] = useState(false)
  const [connectedAccount] =useGlobalState('connectedAccount')

  useEffect(() => {
    const loadData = async () => {
      await isWallectConnected();
      await listProduct()
      await fetchOrders()
      setLoaded(true)
    }
    loadData()
  }, [])

  return (
    <div >
      <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
      {loaded ? (
          <>
          <Route path="/product/:id" element={<Product />} />
          <Route path="/admin" element={<Admin />} />
          </>
          ) : null}
          <Route path="/orders" element={<Orders loaded={loaded} setLoaded={setLoaded}/>} />
  
        </Routes>
      <Toaster />
    </div>
  );
}

export default App;
