import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Modal,
  Card,
  Row,
  Col,
  message,
} from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
const { Title } = Typography;
import "./Style.css";
export default function Register() {
  return (
    <div className="logincontainer">
      <SignUpPage />
    </div>
  );
}

const SignUpPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isSignUpDisabled, setIsSignUpDisabled] = useState(true);
  const [courses, setCourses] = useState([]);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setIsSignUpDisabled(selectedCourses.length !== 3);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    // console.log("Received values:", { ...values, courses: selectedCourses });
    axios
      .post(`https://lmshub.vercel.app/api/users/register`, {
        ...values,
        courses: selectedCourses,
      })
      .then((res) => {
        console.log(res);
        message.success("Registration successful");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onCardClick = (course) => {
    if (selectedCourses.includes(course.name)) {
      setSelectedCourses(selectedCourses.filter((c) => c !== course.name));
    } else if (selectedCourses.length < 3) {
      setSelectedCourses([...selectedCourses, course.name]);
    }
  };

  const getCourses = () => {
    axios
      .get(`https://lmshub.vercel.app/api/courses/courses`)
      .then((res) => {
        console.log(res);
        setCourses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCourses();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Title level={3} style={{ marginBottom: 20 }}>
        Sign Up
      </Title>
      <Form
        name="signup-form"
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
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Name" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input prefix={<MailOutlined />} type="email" placeholder="Email" />
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
            onClick={showModal}
            style={{
              width: "100%",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            Select Courses
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", marginTop: 10, backgroundColor: "#52c41a" }}
            // disabled={isSignUpDisabled}
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Select 3 Courses As Per Your Choice"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row gutter={[16, 16]}>
          {courses.map((course) => (
            <Col key={course.name} span={8}>
              <Card
                onClick={() => onCardClick(course)}
                style={{
                  cursor: "pointer",
                  backgroundColor: selectedCourses.includes(course.name)
                    ? "#52c41a"
                    : "white",
                  textAlign: "center",
                }}
              >
                <img
                  src={course.imageLink}
                  alt={course.name}
                  style={{
                    width: "100%",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: 5,
                  }}
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src =
                      "https://cdn3d.iconscout.com/3d/premium/thumb/coding-5306043-4460164.png?f=webp";
                  }}
                />
                <div>{course.name}</div>
              </Card>
            </Col>
          ))}
        </Row>
      </Modal>

      <div style={{ marginTop: 20 }}>
        Already have an account? <a href="/">Log in</a>
      </div>
    </div>
  );
};
