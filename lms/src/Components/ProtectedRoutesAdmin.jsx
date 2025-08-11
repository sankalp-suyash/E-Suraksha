import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function ProtectedRoutesAdmin(props) {
  const { component: Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let adminLogin = sessionStorage.getItem("admin_logged_in");
    console.log("adminLogin", adminLogin);
    if (!adminLogin) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Component />
    </div>
  );
}
ProtectedRoutesAdmin.propTypes = {
  component: PropTypes.elementType.isRequired,
};
