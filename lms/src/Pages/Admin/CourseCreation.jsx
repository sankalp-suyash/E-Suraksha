// import React from 'react'
import { Layout } from "antd";
import Sidebar from "./Sidebar ";
const { Content } = Layout;
import { Form, Input, Button, message } from "antd";
import "./Styles.css";
import { useState } from "react";
import NavbarHead from "./NavbarHead";
import CourseManage from "./CourseManage";
import axios from "axios";
export default function CourseCreation() {
  return (
    <div>
      <AppLayout />
    </div>
  );
}
const AppLayout = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
      setImageUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const onFinish = (values) => {
    console.log("Received values:", values);
    axios
      .post(`https://lmshub.vercel.app/api/courses/courses`, values)
      .then((res) => {
        console.log(res);
        message.success("Form submitted successfully!");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Layout>
      <Sidebar />

      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <NavbarHead />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              flexDirection: "column",
            }}
          >
            <div className="image-container_topright">
              <img
                src="https://i.ibb.co/CtsLDyq/cc8882905c39c034c16a86ee73c402f6-removebg-preview.png"
                alt="Course"
              />
            </div>
            <div className="form-container">
              <h2 style={{ marginBottom: 20, fontWeight: "bold" }}>
                Course Form
              </h2>
              <Form
                name="course_form"
                onFinish={onFinish}
                style={{
                  width: "100%",
                  padding: 20,
                  borderRadius: 5,
                  boxShadow: "2px 4px 6px rgba(0.1, 0, 0, 0.1)",
                }}
              >
                <Form.Item
                  name="imageLink"
                  rules={[
                    { required: true, message: "Please upload course image!" },
                  ]}
                >
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Form.Item>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Course"
                    style={{ width: "25%", marginBottom: 20 }}
                  />
                )}
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Please input course name!" },
                  ]}
                >
                  <Input placeholder="Course Name" />
                </Form.Item>
                <Form.Item
                  name="description"
                  rules={[
                    { required: true, message: "Please input description!" },
                  ]}
                >
                  <Input.TextArea placeholder="Description" rows={4} />
                </Form.Item>
                <Form.Item
                  name="docsLink"
                  rules={[
                    { required: true, message: "Please input docs link!" },
                  ]}
                >
                  <Input placeholder="Docs Link" />
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
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Content>
        <CourseManage />
      </Layout>
    </Layout>
  );
};
