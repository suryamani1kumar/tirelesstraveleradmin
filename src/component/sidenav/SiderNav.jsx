import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { menuItems } from "../../utils/sidenavurl";

const SiderNav = ({ isSidebarActive }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  return (
    <div>
      <div className={`sidebar ${isSidebarActive ? "active" : ""}`}>
        <div className="head">
          <div className="user-icon">
            <FaRegUserCircle />
          </div>
          <div className="user-details">
            <p className="title">Admin</p>
            <p className="name">Suryamani Kumar</p>
          </div>
        </div>

        <div className="nav navmenu">
          <div className="menu">
            <ul>
              {menuItems.map((item, i) => (
                <li
                  key={i}
                  className={activeMenu === i ? "active" : ""}
                  onClick={() => item.submenu && handleMenuClick(i)}
                >
                  {item.submenu ? (
                    <>
                      <span>
                        {<item.icon />}
                        <span className="text">{item.label}</span>
                        <span className="arrow">
                          <MdOutlineKeyboardArrowDown />
                        </span>
                      </span>
                      {activeMenu === i && (
                        <ul className="sub-menu" style={{ display: "block" }}>
                          {item.submenu.map((sub, idx) => (
                            <li key={idx}>
                              <Link to={sub.path}>
                                {sub.icon && <sub.icon />}
                                <span className="text">{sub.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link to={item.path}>
                      {<item.icon />}
                      <span className="text">{item.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiderNav;
