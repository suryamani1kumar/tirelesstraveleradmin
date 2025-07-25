import { useState } from "react";
import "./Header.scss";
import { FaBars } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { TbLogout } from "react-icons/tb";
import { axiosInstance } from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";

const Header = ({
  isSidebarActive,
  setIsSidebarActive,
  setIsAuthenticated,
}) => {
  let navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  const logout = () => {
    handleClose();
    axiosInstance
      .post("logout")
      .then((res) => {
        console.log("res", res);
        navigate("/");
        setIsAuthenticated(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="topbar">
      <div className="topbar__left">
        <FaBars className="topbar__icon" onClick={toggleSidebar} />
        <div className="topbar__search">
          <input type="text" placeholder="Search..." />
          <FiSearch className="search-icon" />
        </div>
      </div>

      <div className="topbar__right">
        <div className="topbar__profile" onClick={handleClick}>
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="Profile"
          />
          <span>Suryamani Kumar</span>
        </div>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CiEdit />
              account{" "}
            </div>
          </MenuItem>
          <MenuItem onClick={logout}>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TbLogout />
              Logout
            </div>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
