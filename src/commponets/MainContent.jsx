import React, { useEffect, useState } from "react";
import { EllipsisOutlined, LikeOutlined, LikeFilled } from "@ant-design/icons";
import { Avatar, Button, Card, Tooltip } from "antd";
import "./style.css";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useSelector } from "react-redux";
const { Meta } = Card;
const MainContent = ({ feeds }) => {
  const { image, likes } = feeds;
  console.log(likes, "likeees");
  const { userID: currentUserId, userName: currentUserName } = useSelector(
    (store) => store.currentUser
  );
  // const currentUserName = useSelector((store) => store.currentUser.userName);
  const [alreadyLike, setAlreadyLike] = useState(false);
  useEffect(() => {
    debugger;
    if (feeds.likes) {
      const checkk = feeds?.likes.find(
        (item) => item.likerId === currentUserId
      );
      setAlreadyLike(checkk);
      console.log("render", checkk, "checkk");
    }
  }, [feeds]);
  //  likes handler method
  const handleLike = async (postId) => {
    debugger;
    const docRef = doc(db, "usersData", postId);
    const currentDoc = await getDoc(docRef);
    const prevLikes = await currentDoc.data().likes;
    if (prevLikes.length > 0) {
      const alreadyLike = prevLikes.find(
        (item) => item.likerId === currentUserId
      );
      // remove likes
      if (alreadyLike) {
        const disLike = prevLikes.filter(
          (item) => item.likerId !== currentUserId
        );
        await updateDoc(docRef, {
          likes: [...disLike],
        });
      } else {
        // already likes and add new likes
        await updateDoc(docRef, {
          likes: [
            ...prevLikes,
            {
              likerName: currentUserName,

              likerId: currentUserId,
              likedOn: new Date(),
              status: "liked",
            },
          ],
        });
      }
    } else {
      // add first like
      await updateDoc(docRef, {
        likes: [
          {
            likerName: currentUserName,
            likerId: currentUserId,
            likedOn: new Date(),
            status: "liked",
          },
        ],
      });
    }
  };
  const defaultImg =
    "https://www.pngitem.com/pimgs/m/421-4212266_transparent-default-avatar-png-default-avatar-images-png.png";
  //  likes showing in tooltip when user hover the like icon
  const handleLikerName = () => {
    debugger;
    let array = [];
    feeds?.likes?.map((like) => array.push(like?.likerName));
    return array.map((like) => <div>{like}</div>);
  };
  return (
    <div className='mainContent content-wrapper'>
      <Card
        style={{
          width: 600,
        }}
        cover={
          image && <img className='coverImg' alt='Feed_Image' src={image} />
        }
        actions={[
          <span>
            {alreadyLike ? (
              <LikeFilled
                className='likedIcon'
                key='filled'
                onClick={() => handleLike(feeds.id)}
              />
            ) : (
              <LikeOutlined key='like' onClick={() => handleLike(feeds.id)} />
            )}
          </span>,
          <span>
            {feeds?.likes?.length > 0 ? (
              <Tooltip placement='topLeft' title={handleLikerName}>
                <span>{feeds?.likes?.length}- likes</span>
              </Tooltip>
            ) : (
              <span>First like </span>
            )}
          </span>,
        ]}>
        <Meta
          avatar={<Avatar src={image ? image : defaultImg} />}
          title={feeds?.nickName}
          description={feeds?.Bio}
        />
        {feeds?.likes.find((item) => item === currentUserId) && (
          <EllipsisOutlined key='ellipsis' />
        )}
        {/* {feeds?.nickName}---{feeds?.Religion} */}
      </Card>
    </div>
  );
};

export default MainContent;
