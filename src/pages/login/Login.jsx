import React from "react";
import { Button, Checkbox, Form, Input, Layout } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { settingUserID } from "../../redux/UserSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Content } = Layout;
  const onFinish = (values) => {
    const { email, password } = values;
    console.log(email, password, "emai;");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        debugger;
        dispatch(settingUserID(user));
        navigate("/dashboard");
        console.log(user, "user login");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Layout style={{ height: "100vh" }} className='login-wrapper'>
      <Content className='login-container'>
        <div className='from-wrapper'>
          <Form
            name='basic'
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'>
            <Form.Item
              wrapperCol={{
                // offset: 1,
                span: 19,
              }}
              label={<label className='inputLabels'>User Email</label>}
              name='email'
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}>
              <Input className='loginInputs' />
            </Form.Item>

            <Form.Item
              label={<label className='inputLabels'>Password</label>}
              name='password'
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}>
              <Input.Password className='loginInputs' />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 19,
              }}>
              <span className='loginbtn-createAcc'>
                <span className='alreadySignup'>
                  Already a member?
                  <Link to='/signup'>
                    <span> Sign In</span>
                  </Link>
                </span>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </span>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default Login;
