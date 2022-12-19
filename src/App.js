import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import AddProfile from "./commponets/AddProfile";
import Feeds from "./commponets/Feeds";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { settingUserID } from "./redux/UserSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        dispatch(settingUserID(uid));
        console.log(user, uid, "&&&&&&&");
      } else {
        // User is signed out
        dispatch(settingUserID(null));
      }
    });

    // return () => {
    //   second;
    // };
  }, []);

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
