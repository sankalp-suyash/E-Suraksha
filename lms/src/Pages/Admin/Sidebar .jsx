import { Layout, Button, Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  FileOutlined,
  BookOutlined,
  PieChartOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import "./Styles.css";
const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider
      className="sidebar"
      width={250}
      style={{ position: "sticky", top: 0 }}
      theme="light"
    >
      <div className="logo">
        <h1
          style={{
            fontFamily: "cursive",
            cursor: "pointer",
          }}
        >
          E-Suraksha
        </h1>
      </div>
      <Menu
        mode="inline"
        style={{ height: "90%", borderRight: 0, marginTop: "20px" }}
      >
        <Menu.Item key="1" style={{ marginTop: 10 }} icon={<HomeOutlined />}>
          <a href="/admindashboard">Dashboard</a>
        </Menu.Item>
        <Menu.Item key="2" style={{ marginTop: 10 }} icon={<FileOutlined />}>
          <a href="/coursecreation">Course Creation</a>
        </Menu.Item>
        <Menu.Item key="3" style={{ marginTop: 10 }} icon={<BookOutlined />}>
          <a href="/lecturemanagement">Lecture Management</a>
        </Menu.Item>
        <Menu.Item
          key="4"
          style={{ marginTop: 10 }}
          icon={<PieChartOutlined />}
        >
          <a href="/analytics">Analytics and Insights</a>
        </Menu.Item>
        <Menu.Item key="5" style={{ marginTop: 10 }} icon={<UserOutlined />}>
          <a href="/studentsmanagement">Student Management</a>
        </Menu.Item>
        <Menu.Item key="6" icon={<DatabaseOutlined />}>
          <a href="/coursecreation">Course Management</a>
        </Menu.Item>

        <div className="container">
          <div className="top-section">
            <img
              src="https://i.pinimg.com/564x/28/7d/e5/287de5cc1c825597a50d56520555ee32.jpg"
              alt="top image"
            />
          </div>
          <div className="bottom-section">
            <Button
              icon={<SettingOutlined />}
              type="primary"
              style={{ width: "100%" }}
            >
              Settings
            </Button>
          </div>
        </div>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
