import React, { useEffect, useState } from "react";
import { Layout } from "antd";

import MainContent from "./MainContent";
import { onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { collection, where } from "firebase/firestore";
import { handleFeeds } from "../redux/UserSlice";
import UploadFilePpt from "./UploadFilePpt";

const { Content } = Layout;

const Feeds = () => {
  const { userID } = useSelector((store) => store.currentUser);
  const dispatch = useDispatch();
  console.log(userID, "userID");
  const [feedsData, setFeedsData] = useState([]);
  console.log(feedsData, "*****");
  useEffect(() => {
    const q = query(collection(db, "usersData"), where("id", "==", userID));
    const realTimeFeeds = onSnapshot(q, (querysnapshot) => {
      const temp = [];
      querysnapshot.docs.forEach((doc) => {
        debugger;
        temp.push({ ...doc.data(), id: doc.id });
      });
      debugger;
      setFeedsData(temp);
      dispatch(handleFeeds(temp));
    });
    return () => {
      realTimeFeeds();
    };
  }, []);

  return (
    <Content className='content-wrapper'>
      {feedsData.map((feed) => (
        <MainContent feeds={feed} />
      ))}
      <UploadFilePpt />
    </Content>
  );
};

export default Feeds;
