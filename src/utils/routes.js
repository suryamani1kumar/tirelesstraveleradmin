import AddBlog from "../pages/blog/addBlog";
import EditBlog from "../pages/blog/EditBlog";
import Dashboard from "../pages/dashboard";
import Login from "../pages/Login";
import viewBlog from "../pages/blog/viewBlog";
import Category from "../pages/category/Category";
import User from "../pages/user/User";
import Media from "../pages/media/media";
import Order from "../pages/order";

export const protectedRoutes = [
  { path: "/dashboard", Component: Dashboard },
  { path: "/order", Component: Order },
  { path: "/blog/addblog", Component: AddBlog },
  { path: "/blog/viewblog", Component: viewBlog },
  { path: "/blog/:url", Component: EditBlog },
  { path: "/category", Component: Category },
  { path: "/user", Component: User },
  { path: "/media", Component: Media },
];

export const publicRoutes = [
  { path: "/", Component: Login, needsProps: true },
];
