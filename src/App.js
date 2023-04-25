import { BrowserRouter as Router,Route,  Routes } from "react-router-dom";
import Header from "./component/Header"
import Coins from "./component/Coins"
import Exchanges from "./component/Exchanges"
import Coindetails from "./component/Coindetails"
import Home from "./component/Home"
import Footer from "./component/Footer";


function App() {
  return (
  <div>


<Router>
  <Header/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/coins" element={<Coins/>}/>
    <Route path="/exchanges" element={<Exchanges/>}/>
    <Route path="/coin/:id" element={<Coindetails/>}/>
  </Routes>
  <Footer/>
</Router>

  </div>
  );
}

export default App;
