import React, { useEffect } from "react";
import { EllipsisOutlined, LikeOutlined, LikeFilled } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import "./style.css";
import { addDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
const { Meta } = Card;
const MainContent = ({ feeds }) => {
  console.log(feeds, "feeds");
  const handleLike = async (like) => {
    debugger;
    const messageRef = await addDoc(db, "userData", "roomA", "messages");
    console.log("like", messageRef);
  };
  return (
    <div className='mainContent'>
      {" "}
      <Meta
        avatar={
          <Avatar src='https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=700' />
        }
      />
      <Card
        style={{
          width: 600,
        }}
        cover={
          <img
            alt='example'
            src={feeds.image}
            // src='https://firebasestorage.googleapis.com/v0/b/emotion-app-6dc50.appspot.com/o/pexels-photo-2379004.jpeg?alt=media&token=b05cf9e2-4885-4e9a-95aa-31b4cb7281cf'
          />
        }
        actions={[
          <LikeOutlined key='like' onClick={handleLike} />,
          <LikeFilled key='filled' />,
          <EllipsisOutlined key='ellipsis' />,
        ]}>
        <Meta
          avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
          title='Card title'
          description='This is the description'
        />
        {feeds?.nickName}-{feeds.Bio}--{feeds.Religion}
        {/* <img src={feeds?.image} alt='alterrrr ' /> */}
      </Card>
    </div>
  );
};

export default MainContent;
