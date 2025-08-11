// import React from "react";
import { Form, Input, Button, Typography, message, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
const { Title } = Typography;
import "./Style.css";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [visible, setVisible] = useState(false);

  const handleButtonClick = () => {
    setVisible(true);
  };

  const handleModalOk = () => {
    setVisible(false);
  };
  const onFinish = async (values) => {
    try {
      const usersResponse = await axios.get(
        "https://lmshub.vercel.app/api/users/users"
      );
      const users = usersResponse.data;
      const user = users.find(
        (user) =>
          user.email === values.email && user.password === values.password
      );

      if (user) {
        sessionStorage.setItem("lmscurrentstudent", user._id);
        message.success("Login Successful!");
        sessionStorage.setItem("user_logged_in", "true");
        setTimeout(() => {
          window.location.href = "/students";
        }, 1000);
      } else {
        try {
          const adminsResponse = await axios.get(
            "https://lmshub.vercel.app/api/admins"
          );
          const admins = adminsResponse.data;
          console.log(admins);
          const admin = admins.find(
            (admin) =>
              admin.email === values.adminEmail &&
              admin.password === values.password
          );

          if (admin) {
            message.success("Admin Login Successful!");
            sessionStorage.setItem("admin_logged_in", "true");

            setTimeout(() => {
              window.location.href = "/admindashboard";
            }, 1000);
          } else {
            message.error("Login Failed! Please try again.");
          }
        } catch (error) {
          console.error(error);
          message.error("Taking time to data fetch. Try again after sometime.");
        }
      }
    } catch (error) {
      console.error(error);
      message.error("Taking time to data fetch. Try again after sometime.");
    }
  };

  return (
    <div
      className="logincontainer"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Button
        style={{ position: "absolute", top: "10%", right: "10%" }}
        type="primary"
        onClick={handleButtonClick}
      >
        Are You An Admin Click here
      </Button>
      <Modal
        title="Admin Information"
        visible={visible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
      >
        <p>
          <strong>Email:</strong> admin123@admin.com
        </p>
        <p>
          <strong> Password: </strong> 1234pass
        </p>
      </Modal>
      <Title level={2} style={{ marginBottom: 20, fontWeight: "bold" }}>
        Sign In
      </Title>
      <Form
        name="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{
          width: 350,
          padding: 20,
          borderRadius: 5,
          boxShadow: "2px 4px 6px rgba(0.1, 0, 0, 0.1)",
        }}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "100%",
              backgroundColor: "#52c41a",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
      <div style={{ marginTop: 20 }}>
        Do not have an account? <a href="/register">Register now!</a>
      </div>
    </div>
  );
};

export default Login;
