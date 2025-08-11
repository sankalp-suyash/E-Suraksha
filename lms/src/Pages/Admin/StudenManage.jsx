import {
  Layout,
  Table,
  Button,
  Space,
  Tag,
  message,
  Modal,
  Card,
  Typography,
} from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import NavbarHead from "./NavbarHead";
import Sidebar from "./Sidebar ";
import axios from "axios";
import "./Styles.css";
import { useEffect, useState } from "react";
const { Title } = Typography;
const { Content } = Layout;
export default function StudenManage() {
  return (
    <div>
      <AppLayout />
    </div>
  );
}
const AppLayout = () => {
  const [students, setStudents] = useState([]);
  const [singleStudents, setSingleStudents] = useState({});
  const [visible, setVisible] = useState(false);
  const getStudents = () => {
    axios
      .get(`https://lmshub.vercel.app/api/users/users`)
      .then((res) => {
        console.log(res.data);
        setStudents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleView = (id) => {
    console.log(id);
    setVisible(true);
    const user = students.find((user) => user._id === id);
    if (user) {
      // console.log(user);
      setSingleStudents(user);
    } else {
      console.log("User not found");
    }
  };
  console.log(singleStudents);
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: () => (
        <img
          src="https://i.pinimg.com/564x/8e/f5/49/8ef549db43e4de09afddc75eb5effc05.jpg"
          alt="Avatar"
          className="student_avatar"
        />
      ),
    },

    {
      title: "Student Code",
      dataIndex: "_id",
      key: "_id",
      render: (text) => {
        const words = text.split("").slice(0, 6).join("");
        return words.length < text.length ? `${words}` : words;
      },
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Selected Courses",
      dataIndex: "courses",
      key: "courses",
      render: (courses) => (
        <ul>
          {courses.map((course, index) => (
            <Tag key={index} color="blue">
              {/* <Button></Button> */}
              {course}
            </Tag>
          ))}
        </ul>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleView(record._id)}
          ></Button>
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
            danger
          ></Button>
        </Space>
      ),
    },
  ];

  const handleDelete = (id) => {
    axios
      .delete(`https://lmshub.vercel.app/api/users/${id}`)
      .then((res) => {
        console.log(res.data);
        message.error(`Student is Removed `);

        setStudents((prevStudents) =>
          prevStudents.filter((student) => student._id !== id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
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
          <h2 style={{ marginBottom: 20, marginTop: 20, fontWeight: "bold" }}>
            All Students
          </h2>
          <Table
            dataSource={students}
            columns={columns}
            pagination={false}
            className="studentmanagement-table"
          />
        </Content>
      </Layout>
      <Modal
        title="Students Details"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <Card style={{ width: 300 }}>
          <img
            src="https://i.pinimg.com/564x/8e/f5/49/8ef549db43e4de09afddc75eb5effc05.jpg"
            alt="Profile"
            style={{ width: "50%", height: "auto" }}
          />
          <div style={{ padding: "16px" }}>
            <Title level={4}>Name:</Title>
            <p style={{ marginBottom: "8px" }}>{singleStudents.name}</p>
            <Title level={4}>Email:</Title>
            <p style={{ marginBottom: "8px" }}>{singleStudents.email}</p>
            <Title level={4}>Password:</Title>
            <p style={{ marginBottom: "8px" }}>{singleStudents.password}</p>
            <Title level={4}>Courses:</Title>
            <p>
              <strong>Courses:</strong>
            </p>
            {singleStudents.courses && (
              <ul>
                {singleStudents.courses.map((course, index) => (
                  <Tag key={index}>{course}</Tag>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </Modal>
    </Layout>
  );
};
