import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import "./style.css";
const { Meta } = Card;
const MainContent = ({ feeds }) => {
  return (
    <div className='mainContent'>
      {" "}
      <Meta
        avatar={
          <Avatar src='https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=700' />
        }
        // description='profile Img'
      />
      <Card
        style={{
          width: 600,
        }}
        cover={
          <img
            alt='example'
            src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
          />
        }
        actions={[
          <SettingOutlined key='setting' />,
          <EditOutlined key='edit' />,
          <EllipsisOutlined key='ellipsis' />,
        ]}>
        <Meta
          avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
          title='Card title'
          description='This is the description'
        />
        {feeds?.nickName}-{feeds.Bio}--{feeds.Religion}
      </Card>
    </div>
  );
};

export default MainContent;
