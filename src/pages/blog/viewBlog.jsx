import { useEffect } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../utils/fetchData";
import { updateStatusApi } from "../../utils/statusUpdate";
import { axiosInstance } from "../../utils/axiosInstance";

const ViewBlog = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.fetchApi);
  console.log(data, loading, error);

  useEffect(() => {
    dispatch(getData(`allBlog?page=1&limit=4`));
  }, []);

  const handleActive = (url, status) => {
    dispatch(updateStatusApi(`blogStatus?pageurl=${url}&active=${!status}`));
    dispatch(getData(`allBlog?page=1&limit=4`));
  };

  const deleteBlog = (url) => {
    axiosInstance
      .delete(`deleteBlog?pageurl=${url}`)
      .then((res) => {
        dispatch(getData(`allBlog?page=1&limit=4`));
      })
      .catch((err) => console.log("error", err));
  };

  return (
    <div>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Heading</th>
            <th>Page Url</th>
            <th>category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.blog?.map((item, i) => (
            <tr key={i}>
              <td>{item.heading}</td>
              <td>{item.pageUrl}</td>
              <td>{item.category}</td>
              <td className="d-flex justify-content-around">
                <p onClick={() => handleActive(item.pageUrl, item.active)}>
                  {item.active ? <FaEye /> : <IoEyeOff />}
                </p>
                <p>
                  <Link to={`/blog/${item.pageUrl}`}>
                    <FaEdit />
                  </Link>
                </p>
                <p onClick={() => deleteBlog(item.pageUrl)}>
                  {" "}
                  <FaTrash />
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBlog;
