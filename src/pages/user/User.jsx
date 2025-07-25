import React, { useEffect, useState } from "react";
import { sumbitData } from "../../utils/postData";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/loader/Loader";
import { getData } from "../../utils/fetchData";
import { updateStatusApi } from "../../utils/statusUpdate";
import { FaEye, FaEdit } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

const User = () => {
  const dispatch = useDispatch();
  const AddData = useSelector((state) => state.postApi);
  const updateStatus = useSelector((state) => state.updateStatusApi);
  const { data, loading, error } = useSelector((state) => state.fetchApi);
  const [createuser, setCreateuser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    isActive: "",
    username: "",
  });
  const handleUser = (e) => {
    const { value, name } = e.target;
    setCreateuser({ ...createuser, [name]: value });
  };

  useEffect(() => {
    dispatch(getData(`getuser?page=1&limit=4`));
  }, [updateStatus.loading]);

  const sumbitUser = (e) => {
    e.preventDefault();
    const requestData = createuser;
    dispatch(
      sumbitData({
        url: "createUser",
        requestBody: requestData,
      })
    );
  };

  return (
    <div>
      <form
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onSubmit={sumbitUser}
      >
        <label>
          Name*
          <input
            placeholder="Name*"
            style={{ padding: "5px", display: "block", width: "240px" }}
            name="name"
            value={createuser.name}
            onChange={handleUser}
          />
        </label>

        <label>
          Email*
          <input
            type="email"
            placeholder="Email*"
            style={{ padding: "5px", display: "block", width: "250px" }}
            name="email"
            value={createuser.email}
            onChange={handleUser}
          />
        </label>
        <label>
          Password*
          <input
            type="password"
            placeholder="Password*"
            style={{ padding: "5px", display: "block" }}
            name="password"
            value={createuser.password}
            onChange={handleUser}
          />
        </label>
        <label>
          User Name
          <input
            type="text"
            placeholder="user name"
            style={{ padding: "5px", display: "block" }}
            name="username"
            value={createuser.username}
            onChange={handleUser}
          />
        </label>
        <label>
          Status
          <select
            style={{ padding: "5px", display: "block" }}
            name="isActive"
            value={createuser.isActive}
            onChange={handleUser}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </label>
        <label>
          Role
          <select
            style={{ padding: "5px", display: "block" }}
            name="role"
            value={createuser.role}
            onChange={handleUser}
          >
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
        </label>
        <button type="sumbit">Add user</button>
      </form>

      <table className="custom-table">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>User Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            data?.user?.map((item, i) => (
              <tr key={i}>
                <td>{item.userid}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>{item.username}</td>
                <td className="d-flex justify-content-around">
                  <p
                    onClick={() =>
                      dispatch(
                        updateStatusApi(
                          `userStatus?userid=${
                            item.userid
                          }&isActive=${!item.isActive}`
                        )
                      )
                    }
                  >
                    {item.isActive ? <FaEye /> : <IoEyeOff />}
                  </p>

                  <p onClick={() => console.log("hello")}>
                    {" "}
                    <FaEdit />
                  </p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {AddData.loading || (updateStatus.loading && <Loader />)}
    </div>
  );
};

export default User;
