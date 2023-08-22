import "./index.css";
import './App.css';
import { BrowserRouter, Routes,Route, Navigate } from 'react-router-dom';

import Home from "./pages/home";
import Auth from "./pages/auth";
import Orders from './pages/orders';
import Order from './pages/order';



function App() {

  return (
    <BrowserRouter>
         <div className="App relative" style={{fontFamily:'Poppins'}}>
            <Routes>
            <Route path = '/' exact element = {<Navigate to = '/auth'/>}/>
            <Route path = '/home' exact element = {<Home/>}/>
            <Route path ='/auth' element={<Auth/>}/>
            <Route path ='/orders' element={<Orders/>}/>
            <Route path ='/order/:id' element={<Order/>}/>
            </Routes>
        </div>
        </BrowserRouter>
  );
}

export default App;
