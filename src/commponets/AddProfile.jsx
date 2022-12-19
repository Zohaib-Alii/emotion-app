import React, { useState } from "react";
import { InboxOutlined, UserOutlined, UploadOutline } from "@ant-design/icons";
import { Form, Input, Button, Upload, DatePicker, Row, Avatar } from "antd";
import { Layout } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addDoc, collection, doc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const { Header, Footer, Sider, Content } = Layout;
const { TextArea } = Input;
const AddProfile = () => {
  const [image, setImage] = useState(null);
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
  const onFinish = async (values) => {
    debugger;
    console.log("Success:", values);

    console.log(imageUrl, "sd");
    const data = {
      ...values,
      id: userID,
      image: imageUrl,
    };
    await addDoc(collection(db, "usersData"), data);
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
                  action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                  listType='picture'
                  beforeUpload={(e) => {
                    console.log("IMAGE", e);
                    handleImageUpload(e);
                  }}
                  maxCount={1}>
                  <Button
                  // icon={<UploadOutline />}
                  >
                    Upload (Max: 1)
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
