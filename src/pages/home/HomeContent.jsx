import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import MainContent from "../../commponets/MainContent";
import { useDispatch } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { handleFeeds } from "../../redux/UserSlice";
const { Content } = Layout;
const HomeContent = () => {
  const [timeline, setTimeline] = useState([]);
  const dispatch = useDispatch();
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
          <MainContent key={feed?.id} feeds={feed} />
        ))}
      </Content>
      <Routes>
        <Route path='*' element={<HomeContent />} />
        <Route path='addNewFeed' element={<AddProfile />} />
        <Route path='feeds' element={<Feeds />} />
      </Routes>
    </>
  );
};

export default HomeContent;
