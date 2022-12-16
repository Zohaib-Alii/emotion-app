import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import AddProfile from "./commponets/AddProfile";
import Feeds from "./commponets/Feeds";

function App() {
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/createProfile' element={<AddProfile />} />
        <Route path='/feeds' element={<Feeds />} />
      </Routes>
    </div>
  );
}

export default App;
