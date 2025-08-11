import { Button, Layout, Modal, Space } from "antd";
const { Header } = Layout;
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
// import { Link as RouterLink } from "react-router-dom";

export default function NavbarHead() {
  const handleLogout = () => {
    sessionStorage.removeItem("admin_logged_in");
    setTimeout(() => {
      window.location.href = "/";
    }, 800);
  };
  const admin = {
    name: "Admin123",
    email: "admin123@admin.com",
    password: "1234pass",
    imageUrl:
      "https://i.pinimg.com/564x/0c/ce/24/0cce244c8456e9632233b1921450f5af.jpg", // URL to admin's image
  };
  const showModal = () => {
    Modal.info({
      title: "Admin Information",
      content: (
        <div>
          <img
            src={admin.imageUrl}
            alt="Admin"
            style={{ width: 100, borderRadius: "50%", marginRight: 20 }}
          />
          <Space direction="vertical">
            <div>
              <strong>Name:</strong> {admin.name}
            </div>
            <div>
              <strong>Email:</strong> {admin.email}
            </div>
            <div>
              <strong>Password:</strong> {admin.password}
            </div>
          </Space>
        </div>
      ),
      onOk() {},
    });
  };
  return (
    <div>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "white",
          borderRadius: "5px",
          padding: "5px 20px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {" "}
          <div
            style={{
              marginRight: 20,
              color: "black",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Admin Panel
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* <RouterLink to="/student-profile"> */}
          <Button
            type="text"
            icon={<UserOutlined />}
            style={{ marginRight: 20 }}
            onClick={showModal}
          />
          {/* </RouterLink> */}
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          />
        </div>
      </Header>
    </div>
  );
}
