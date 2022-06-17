
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/font-awesome/css/font-awesome.min.css"
import Navbar from './components/Navbar/Navbar';
import Products from './components/Products/Products';
import Product from './components/Products/Product';
import Cart from './components/Cart/Cart';
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Products />} />
        <Route exact path="/:id" element={<Product/> } />
        <Route exact path="/Cart" element={<Cart/> } />
      </Routes>
    </div>
  );
}

export default App;
