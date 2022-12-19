import React, { useEffect, useState } from "react";
import { Button, Layout } from "antd";
import { Link } from "react-router-dom";
import MainContent from "./MainContent";
import { onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { collection, where } from "firebase/firestore";
import { handleFeeds } from "../redux/UserSlice";
const { Header, Footer, Sider, Content } = Layout;

const Feeds = () => {
  const { userID } = useSelector((store) => store.currentUser);
  const dispatch = useDispatch();
  console.log(userID, "userID");
  const [feedsData, setFeedsData] = useState([]);
  console.log(feedsData, "*****");
  useEffect(() => {
    debugger;
    const q = query(collection(db, "usersData"), where("id", "==", userID));
    console.log(q, "check query result", userID);
    const realTimeFeeds = onSnapshot(q, (querysnapshot) => {
      const temp = [];
      querysnapshot.docs.forEach((doc) => {
        debugger;
        temp.push({ ...doc.data(), id: doc.id });
      });
      setFeedsData(temp);
      dispatch(handleFeeds(temp));
    });
    return () => {
      realTimeFeeds();
    };
  }, []);

  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Sider>
          <Link to='/createprofile'>
            <Button>Add Feeds</Button>
          </Link>
          <Link to='/'>
            <Button>Home</Button>
          </Link>
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content className='content-wrapper'>
            {feedsData.map((feed) => (
              <MainContent feeds={feed} />
            ))}
          </Content>
          <Footer>test</Footer>
        </Layout>
        <Sider>Sider</Sider>
      </Layout>
    </div>
  );
};

export default Feeds;
