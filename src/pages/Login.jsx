import { HiOutlineUserCircle } from 'react-icons/hi';
import { FaLock, FaUser } from 'react-icons/fa';
import { BiSolidHide, BiSolidShow } from 'react-icons/bi';
import { useState } from 'react';
import { MdError } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance';
import Loader from '../component/loader/Loader';

const Login = (props) => {
  const { setIsAuthenticated } = props;
  let navigate = useNavigate();
  const [passwordHideShow, setPasswordHideShow] = useState(true);
  const [loginDetails, setLoginDetails] = useState({
    password: '',
    userormail: '',
  });
  const [errorMessage, setErrorMessage] = useState({});
  const [laoding, setLoading] = useState(false);

  const handleloginDetails = (e) => {
    const { value, name } = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
    setErrorMessage({});
  };
  const preventCopyPaste = (e) => {
    e.preventDefault();
    return false;
  };
  const handlelogin = (e) => {
    e.preventDefault();
    if (!loginDetails.userormail && !loginDetails.password) {
      setErrorMessage({ password: 'error', userormail: 'error' });
      return;
    } else if (!loginDetails.userormail) {
      setErrorMessage({
        userormail: 'Please fill out email or username fields.',
      });
      return;
    }
    const body = {
      userIdOrmail: loginDetails.userormail,
      password: loginDetails.password,
    };
    setLoading(true);
    axiosInstance
      .post(`login`, body)
      .then((res) => {

        setIsAuthenticated(true);
        navigate('/dashboard');
        setLoading(false);
      })
      .catch((err) => {
        if (err?.response?.status === 403) {
          alert('Access Denied!');
        } else if (err?.response?.status === 404) {
          alert(err.message);
        } else {
          console.log('error', err.message);
        }
        setLoading(false);
      });
  };

  return (
    <div className="loginconatiner">
      <div className="login">
        <div className="login_form-box ">
          <div className="login_header-form">
            <HiOutlineUserCircle />
          </div>

          <form className="login-form" onSubmit={handlelogin}>
            {errorMessage.password && errorMessage.userormail ? (
              <div className="error error-style-1">
                <MdError /> Please fill out all required fields.
              </div>
            ) : errorMessage.userormail ? (
              <div className="error error-style-1">
                <MdError /> {errorMessage.userormail}
              </div>
            ) : errorMessage.password ? (
              <div className="error error-style-1">
                <MdError /> {errorMessage.password}
              </div>
            ) : null}
            <div className="login_input-group">
              <div className="login_input-group-prepend">
                <span className="login_input-group-text">
                  <FaUser />
                </span>
              </div>
              <input
                type="text"
                className="login_form-control"
                placeholder="Enter email or username"
                autoComplete="off"
                name="userormail"
                id="userormail"
                value={loginDetails.userormail}
                onChange={handleloginDetails}
              />
            </div>
            <div className="login_input-group">
              <div className="login_input-group-prepend">
                <span className="login_input-group-text">
                  <FaLock />
                </span>
              </div>
              <input
                type={passwordHideShow ? 'password' : 'text'}
                placeholder="Enter password"
                className="login_form-control"
                name="password"
                id="password"
                autoComplete="off"
                value={loginDetails.password}
                onChange={handleloginDetails}
                onPaste={preventCopyPaste}
                onCopy={preventCopyPaste}
              />
              <span
                className="passhidshow"
                onClick={() => setPasswordHideShow(!passwordHideShow)}
              >
                {passwordHideShow ? <BiSolidHide /> : <BiSolidShow />}
              </span>
            </div>
            <button type="submit" className="btn btn-secondary btn-block">
              LOGIN
            </button>
            <div className="message">
              <div className="loginRemember">
                <input type="checkbox" /> Remember me
              </div>
              <div>
                <Link to="/forgotpassword">Forgot your password</Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      {laoding && <Loader />}
    </div>
  );
};

export default Login;
