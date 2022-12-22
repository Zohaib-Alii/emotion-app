import React, { useEffect, useState } from "react";
import { Button, Layout } from "antd";
import MainContent from "./../../commponets/MainContent";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { onSnapshot, collection } from "firebase/firestore";
import "./style.css";
import { handleFeeds } from "../../redux/UserSlice";
import HomeContent from "./HomeContent";
import AddProfile from "./../../commponets/AddProfile";
import Feeds from "../../commponets/Feeds";
import logo from "../../assets/images/mainLogo.png";
import logout from "../../assets/images/logout.png";
const { Header, Sider } = Layout;
const Home = () => {
  const [timeline, setTimeline] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userID } = useSelector((store) => store.currentUser);
  console.log("**", userID);
  useEffect(() => {
    const realTimeFeeds = onSnapshot(
      collection(db, "usersData"),
      (querysnapshot) => {
        const temp = [];
        querysnapshot.docs.forEach((doc) => {
          console.log("querysnapshot", doc);
          temp.push({ ...doc.data(), id: doc.id });
        });
        setTimeline(temp);
        dispatch(handleFeeds(temp));
      }
    );
    return () => {
      realTimeFeeds();
    };
  }, []);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        alert("An error occurred", error);
      });
  };
  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Sider className='main-Color sidebar-wrapper'>
          <Link to='/dashboard'>
            <img className='siteLogo' src={logo} alt='App logo' />
          </Link>
          <span onClick={handleLogout}>
            <img className='logoutIcon' src={logout} alt='Logout logo' />
          </span>
        </Sider>
        <Layout>
          <Header className='header-wrapper main-Color'>
            <Link to='/dashboard'>
              <div className='main-Heading'>Emotion App</div>
            </Link>
            <div className='main-HeadingRight'>
              <Link to='/dashboard/addNewFeed'>
                <Button type='primary'>Add new feed</Button>
              </Link>
              <Link to='/dashboard/feeds'>
                <Button type='primary'>My feed</Button>
              </Link>
            </div>
          </Header>
          <Routes>
            <Route path='*' element={<HomeContent />} />
            <Route path='addNewFeed' element={<AddProfile />} />
            <Route path='feeds' element={<Feeds />} />
          </Routes>
        </Layout>
      </Layout>
    </>
  );
};

export default Home;
