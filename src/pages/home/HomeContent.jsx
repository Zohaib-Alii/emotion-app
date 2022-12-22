import React, { useEffect, useState } from "react";
import { Button, Layout } from "antd";
import MainContent from "../../commponets/MainContent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { handleFeeds } from "../../redux/UserSlice";
const { Content } = Layout;
const HomeContent = () => {
  const [timeline, setTimeline] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userID } = useSelector((store) => store.currentUser);
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
  return (
    <>
      <Content className='content-wrapper'>
        {timeline.map((feed) => (
          <MainContent feeds={feed} />
        ))}
      </Content>
    </>
  );
};

export default HomeContent;
