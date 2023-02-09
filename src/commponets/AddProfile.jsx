import React, { useState } from "react";
import {
  UserOutlined,
  HeartOutlined,
  CloudUploadOutlined,
  VerifiedOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, Upload, Avatar, message } from "antd";
import { Layout } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AddNewFeed from "./drawers/AddNewFeed";
const { Content } = Layout;
const { TextArea } = Input;
const AddProfile = () => {
  const [imageUrl, setimageUrl] = useState(null);
  const { userID } = useSelector((store) => store.currentUser);
  console.log(userID);
  const handleImageUpload = (image) => {
    debugger;
    const { name } = image;
    const imageRef = ref(storage, name);
    uploadBytes(imageRef, image).then(() => {
      getDownloadURL(imageRef)
        .then((url) => {
          debugger;
          setimageUrl(url);
        })
        .catch((err) => {
          alert("Error:", err);
        });
    });
  };
  console.log(imageUrl, "imageUrl");
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    debugger;
    const data = {
      ...values,
      id: userID,
      image: imageUrl,
      likes: [],
    };
    const hide = message.loading("New Feed Creation in progress..", 0);
    // Dismiss manually and asynchronously
    setTimeout(hide, 1000);
    await addDoc(collection(db, "usersData"), data).then(() => {
      debugger;
      message.success("Feed Created successfully");
      form.resetFields();
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const normFile = (e) => {
    console.log("Upload event:", e);
    debugger;
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <Content className=''>
      <div className=' addProfileWrapper'>
        <div className='formWraper'>
          <Form
            form={form}
            className='widthFull'
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
            <Form.Item
              className=''
              label='Name'
              name='nickName'
              rules={[
                {
                  required: true,
                  message: "Please input your nickName!",
                },
              ]}>
              <Input
                size='large'
                placeholder='Enter your name'
                prefix={<UserOutlined />}
              />
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
              <Input
                size='large'
                placeholder='Enter your Religion'
                prefix={<HeartOutlined />}
              />
            </Form.Item>

            <Form.Item
              label='Description'
              name='Bio'
              rules={[
                {
                  required: true,
                  message: "Please input your Description!",
                },
              ]}>
              <TextArea
                // prefix={<VerifiedOutlined />}
                size='large'
                // placeholder='Please describe your self'
                rows={4}
              />
            </Form.Item>

            <Form.Item label='Profile Picture'>
              {/* <Form.Item
                    name='image'
                    valuePropName='fileList'
                    getValueFromEvent={normFile}
                    noStyle>
                    <Upload.Dragger>
                      <Avatar
                        name='files'
                        action='/upload.do'
                        size={64}
                        icon={<UserOutlined />}
                      />
                    </Upload.Dragger>
                  </Form.Item> */}
              <Form.Item
                name='image'
                getValueFromEvent={normFile}
                valuePropName='fileList'>
                <Upload
                  className='widthFull'
                  // action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                  listType='picture'
                  beforeUpload={(e) => {
                    console.log("IMAGE", e);
                    handleImageUpload(e);
                  }}
                  maxCount={1}>
                  <Button size='large' icon={<CloudUploadOutlined />}>
                    Upload Picture
                  </Button>
                </Upload>
              </Form.Item>
            </Form.Item>
            {/* <Form.Item
              name='upload'
              label='Upload'
              valuePropName='fileList'
              getValueFromEvent={normFile}
              extra='long'>
              <Upload name='logo' action='/upload.do' listType='picture'>
                <Button
                //   icon={<UploadOutlined />}
                >
                  Click to upload
                </Button>
              </Upload>
            </Form.Item> */}

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}>
              <Button className='submitForm' type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      {/* <AddNewFeed /> */}
    </Content>
  );
};

export default AddProfile;
