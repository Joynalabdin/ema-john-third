import React from 'react';
import './App.css';
import Header from './component/Header/Header';
import Shop from './component/Shop/Shop';
import Product from './component/Product/Product';

function App() {
  return (
    <div>
      <Header></Header> 
      <Shop></Shop>
      <Product></Product>
    </div>
  );
}

export default App;
