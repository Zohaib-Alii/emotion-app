import React, { useEffect, useState } from "react";
import { Button, Layout } from "antd";
import MainContent from "./../../commponets/MainContent";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { onSnapshot, collection } from "firebase/firestore";
import "./style.css";
import { handleFeeds } from "../../redux/UserSlice";
const { Header, Footer, Sider, Content } = Layout;
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
        <Sider className='header-wrapper'></Sider>
        <Layout>
          <Header className='header-wrapper'>
            Header{" "}
            <Link to='/createprofile'>
              {" "}
              <Button type='primary'>Add new feed</Button>
            </Link>
            <Link to='/feeds'>
              <Button type='primary'>My feed</Button>
            </Link>
          </Header>
          <Content className='content-wrapper'>
            {timeline.map((feed) => (
              <MainContent feeds={feed} />
            ))}
          </Content>
          <Footer>
            <Button type='primary' onClick={handleLogout}>
              Logout
            </Button>
          </Footer>
        </Layout>
        <Sider>Sider</Sider>
      </Layout>
    </>
  );
};

export default Home;
