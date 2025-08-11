import { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Card, Row, Typography, Button } from "antd";
import Sidebar from "./Sidebar ";
const { Content } = Layout;
const { Title } = Typography;
import { Link as RouterLink } from "react-router-dom";
import "./Styles.css";
import NavbarHead from "./NavbarHead";
export default function Analytics() {
  return (
    <div>
      <AppLayout />
    </div>
  );
}

const AppLayout = () => {
  const [courses, setCourses] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [lectures, setLectures] = useState([]);
  const getTotalUsers = () => {
    axios
      .get(`https://lmshub.vercel.app/api/users/users`)
      .then((res) => {
        console.log(res.data);
        setTotalUsers(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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

  const getAllLectures = () => {
    axios
      .get(`https://lmshub.vercel.app/api/lectures`)
      .then((res) => {
        // console.log(res.data);
        setLectures(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCourseData();
    getTotalUsers();
    getAllLectures();
  }, []);
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
          {/* Navbar */}
          <NavbarHead />
          {/* Content */}
          <Card className="total-students-card">
            <div className="card-content">
              <h2>Total Students</h2>
              <h1>{totalUsers}</h1>
            </div>
          </Card>
          {/* all courses */}
          <Title level={1} style={{ marginBottom: 20, fontWeight: "bold" }}>
            All Courses
          </Title>
          <Row gutter={[16, 16]}>
            {courses.map((course, i) => (
              <Card
                key={i}
                className="custom-card"
                hoverable
                style={{ width: 190 }}
                cover={
                  <div className="card-cover">
                    <img
                      src={course.imageLink}
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src =
                          "https://cdn3d.iconscout.com/3d/premium/thumb/coding-5306043-4460164.png?f=webp";
                      }}
                      alt="course Image"
                    />
                  </div>
                }
                actions={[
                  <a
                    key={i}
                    href={course.docsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Docs
                  </a>,
                ]}
              >
                <div
                  className="custom-card-content"
                  style={{ textAlign: "center" }}
                >
                  <h3>{course.name}</h3>
                  {/* <p>{course.description}</p> */}
                </div>
              </Card>
            ))}
          </Row>
          <Title level={1} style={{ marginBottom: 20, fontWeight: "bold" }}>
            Lectures
          </Title>
          {lectures.map((ele, i) => (
            <Card key={i} className="horizontal-card" hoverable>
              <div className="card-content">
                <div className="image-container">
                  <img
                    className="image_container_image"
                    alt={name}
                    src="https://students.masaischool.com/static/media/openBookImage.95b8e8b4378306339c056f175c2f9b66.svg"
                  />
                </div>
                <div className="details">
                  <h3>{ele.lectureName}</h3>
                  <p>{ele.lectureTitle}</p>
                  <p>
                    {ele.startTime} - {ele.endTime}
                  </p>
                </div>
                <div className="join-button">
                  <RouterLink target="_blank" to={ele.classLink}>
                    <Button type="primary">Join</Button>
                  </RouterLink>
                </div>
              </div>
            </Card>
          ))}
        </Content>
      </Layout>
    </Layout>
  );
};
