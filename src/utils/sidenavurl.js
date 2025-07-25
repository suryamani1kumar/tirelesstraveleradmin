import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { SiGooglemarketingplatform } from "react-icons/si";
import { MdOutlineAttachEmail } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { LuLogs } from "react-icons/lu";

import { MdContentPaste } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";


export const menuItems = [
  {
    id: 0,
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/dashboard",
  },
  {
    id: 1,
    label: "Users",
    icon: FaUsers,
    submenu: [
      { label: "User", path: "/user", icon: FaRegUser },
      { label: "User Roles", path: "/user", icon: RiAdminFill },
    ],
  },
  {
    id: 2,
    label: "Marketing",
    icon: SiGooglemarketingplatform,
    submenu: [
      { label: "Email Campaigns", path: "/mail", icon: MdOutlineAttachEmail },
      { label: "Promo Codes/ Offers", path: "/mail", icon: BiSolidOffer },
      { label: "Banners", path: "/mail", icon: SiGooglemarketingplatform },
    ],
  },
  {
    id: 3,
    label: "Content",
    icon: MdContentPaste,
    submenu: [
      { label: "Category", path: "/category" },
      { label: "Add Blog", path: "/blog/addblog" },
      { label: "View Blog", path: "/blog/viewblog" },
      { label: "Media (Images, Docs)", path: "/media" },
    ],
  },
  {
    id: 4,
    label: "Logs",
    icon: LuLogs,
    submenu: [
      { label: "Activity Logs", path: "/mail" },
      { label: "System Logs", path: "/mail" },
    ],
  },
  {
    id: 5,
    label: "Reports",
    icon: TbReportSearch,
    submenu: [
      { label: "Sales Report", path: "/mail" },
      { label: "Traffic Reports", path: "/mail" },
    ],
  },
];
