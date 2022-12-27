import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { settingUserID } from "./redux/UserSlice";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pathname = window.location.pathname;
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        debugger;
        dispatch(settingUserID(user));
        // User is signed in, see docs for a list of available properties
        // new things add
        navigate("/dashboard");
        console.log(user, "App.js use effect ");
      } else {
        // User is signed out
        dispatch(settingUserID(null));
        pathname === "/signup" ? navigate("/signup") : navigate("/login");
      }
    });
  }, []);

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/dashboard/*' element={<Home />} />
      {/* <Route path='/createProfile' element={<AddProfile />} />
        <Route path='/feeds' element={<Feeds />} /> */}
    </Routes>
  );
}

export default App;
