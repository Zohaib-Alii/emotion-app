import React from "react";
import { Button, Checkbox, Form, Input, Layout } from "antd";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { Content } = Layout;
  const onFinish = (values) => {
    const { email, password, Name } = values;
    console.log(email, password, Name, "emai;");
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: Name,
        });

        navigate("/login");
        console.log(user, "user created successfully");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Layout>
          <Content className='login-container'>
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
              <Form.Item
                label='Name'
                name='Name'
                rules={[
                  {
                    required: true,
                    message: "Please input your Name!",
                  },
                ]}>
                <Input />
              </Form.Item>
              <Form.Item
                label='Email'
                name='email'
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}>
                <Input />
              </Form.Item>
              <Form.Item
                label='Password'
                name='password'
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}>
                <Input.Password />
              </Form.Item>

              <Form.Item
                name='remember'
                valuePropName='checked'
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

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
        </Layout>
      </Layout>
    </div>
  );
};

export default Signup;
