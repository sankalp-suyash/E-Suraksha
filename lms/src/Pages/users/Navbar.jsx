import { Layout, Button } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link as RouterLink } from "react-router-dom";
const { Header } = Layout;

const Navbar = () => {
  const handleLogout = () => {
    sessionStorage.removeItem("user_logged_in");
    setTimeout(() => {
      window.location.href = "/";
    }, 800);
  };

  return (
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
        <RouterLink to="/students">
          {" "}
          <div
            style={{
              marginRight: 20,
              color: "black",
              fontSize: 25,
              fontWeight: "bold",
              fontFamily: "cursive",
            }}
          >
            LMS
          </div>
        </RouterLink>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <RouterLink to="/student-profile">
          <Button
            type="text"
            icon={<UserOutlined />}
            style={{ marginRight: 20 }}
          />
        </RouterLink>
        <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout} />
      </div>
    </Header>
  );
};

export default Navbar;
