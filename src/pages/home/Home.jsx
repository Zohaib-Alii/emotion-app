import React from "react";
import { Button, Layout } from "antd";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import HomeContent from "./HomeContent";
import AddProfile from "./../../commponets/AddProfile";
import Feeds from "../../commponets/Feeds";
import logo from "../../assets/images/mainLogo.png";
import { LogoutOutlined } from "@ant-design/icons";
import "./style.css";
const { Header, Sider } = Layout;
const Home = () => {
  const navigate = useNavigate();
  // logout handler
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
            <LogoutOutlined className='logoutIcon' />
          </span>
        </Sider>
        <Layout>
          <Header className='header-wrapper main-Color'>
            <Link to='/dashboard'>
              <div className='main-Heading'>Feeds</div>
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
        </Layout>
      </Layout>
    </>
  );
};

export default Home;
