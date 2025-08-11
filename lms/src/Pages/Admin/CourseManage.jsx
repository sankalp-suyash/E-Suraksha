// import React from 'react'
import { useEffect, useState } from "react";
import { Table, Button, Space, message, Modal } from "antd";
import { Form, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
export default function CourseManage() {
  return (
    <div>
      <h1> Course Management</h1>
      <CourseTable />
    </div>
  );
}

const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [visible, setVisible] = useState(false);

  const getCourseData = () => {
    axios
      .get(`https://lmshub.vercel.app/api/courses/courses`)
      .then((res) => {
        // console.log(res.data);
        setCourses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    // console.log(`Deleting item with id: ${id}`);
    axios
      .delete(`https://lmshub.vercel.app/api/courses/${id}`)
      .then((res) => {
        console.log(res.data);
        message.error(`Course is Removed `);

        setCourses((prevCourses) =>
          prevCourses.filter((course) => course._id !== id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [imageUrl, setImageUrl] = useState(null);
  const [courseId, setCourseId] = useState(null);
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
      .put(
        `https://lmshub.vercel.app/api/courses/courses/${courseId}`,
        values
      )
      .then((res) => {
        console.log(res);
        window.location.reload();
        message.success("Your Course has been Updated successfully 🎊🎊");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCourseData();
  }, []);

  const handleEdit = (id) => {
    console.log(`Editing item with id: ${id}`);
    setCourseId(id);
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };
  const columns = [
    {
      title: "Image",
      dataIndex: "imageLink",
      key: "imageLink",
      render: (imageLink) => (
        <img
          style={{ width: 50, height: 50, borderRadius: "50%" }}
          src={imageLink}
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src =
              "https://cdn3d.iconscout.com/3d/premium/thumb/coding-5306043-4460164.png?f=webp";
          }}
          alt="course Image"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Docs",
      dataIndex: "docsLink",
      key: "docsLink",
      render: (docsLink) => (
        <a target="_blank" href={docsLink}>
          Docs
        </a>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record._id)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={courses} columns={columns} />
      <Modal
        title="Edit Course"
        visible={visible}
        onCancel={handleClose}
        footer={null}
      >
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
            rules={[{ required: true, message: "Please upload course image!" }]}
          >
            <Input type="file" accept="image/*" onChange={handleImageChange} />
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
            rules={[{ required: true, message: "Please input course name!" }]}
          >
            <Input placeholder="Course Name" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <Input.TextArea placeholder="Description" rows={4} />
          </Form.Item>
          <Form.Item
            name="docsLink"
            rules={[{ required: true, message: "Please input docs link!" }]}
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
      </Modal>
    </>
  );
};
