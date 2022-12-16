import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Form, Input, Button, Upload, DatePicker, Row } from "antd";
import { Layout } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
const { Header, Footer, Sider, Content } = Layout;
const { TextArea } = Input;
const AddProfile = () => {
  const { userID } = useSelector((store) => store.currentUser);
  console.log(userID);
  const onFinish = async (values) => {
    console.log("Success:", values);
    const data = {
      ...values,
      id: userID,
    };
    const users = await addDoc(collection(db, "userProfile"), data);
    // await doc(db, "users", userID, values);
    console.log(users);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider>
        {" "}
        <button type='primary'>
          <Link to='/'> Home</Link>
        </button>
      </Sider>
      <Layout>
        <Header> Create Profile</Header>
        <Content className='dFlex'>
          <Form
            name='basic'
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'>
            <Row>
              <Form.Item
                label='Nick Name'
                name='nickName'
                rules={[
                  {
                    required: true,
                    message: "Please input your nickName!",
                  },
                ]}>
                <Input />
              </Form.Item>

              <Form.Item
                label='Religion'
                name='Religion'
                rules={[
                  {
                    required: true,
                    message: "Please input your Religion!",
                  },
                ]}>
                <Input />
              </Form.Item>
            </Row>
            {/* <Form.Item
              label='Date Of Birth'
              name='DOB'
                rules={[
                  {
                    required: true,
                    message: "Please input your DOB!",
                  },
                ]}
            >
              <DatePicker />
            </Form.Item> */}
            <Form.Item
              label='BIO'
              name='Bio'
              rules={[
                {
                  required: true,
                  message: "Please input your BIO!",
                },
              ]}>
              <TextArea rows={4} />
            </Form.Item>
            {/* <Form.Item label='Profile' valuePropName='fileList'>
          <Upload action='/upload.do' listType='picture-card'>
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}>
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item> */}
            {/* <Form.Item label='Profile Picture'>
              <Form.Item
                name='dragger'
                valuePropName='fileList'
                getValueFromEvent={normFile}
                noStyle>
                <Upload.Dragger name='files' action='/upload.do'>
                  <p className='ant-upload-drag-icon'>
                    <InboxOutlined />
                  </p>
                  <p className='ant-upload-text'>
                    Click or drag file to this area to upload
                  </p>
                  <p className='ant-upload-hint'>
                    Support for a single or bulk upload.
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item> */}
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Content>
        <Footer></Footer>
      </Layout>
      <Sider>Sider</Sider>
    </Layout>
  );
};

export default AddProfile;
