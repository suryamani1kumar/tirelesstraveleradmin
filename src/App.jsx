import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SiderNav from "./component/sidenav/SiderNav";
import { useState, useEffect } from "react";
import { protectedRoutes, publicRoutes } from "./utils/routes";
import Header from "./component/Header/Header";
import axios from "axios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const checkToken = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}verify`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <BrowserRouter>
      {isAuthenticated && (
        <>
          <SiderNav isSidebarActive={isSidebarActive} />
          <div
            style={{
              width: isSidebarActive
                ? "calc(100% - 92px)"
                : "calc(100% - 250px)",
              marginLeft: isSidebarActive ? "92px" : "250px",
            }}
          >
            <Header
              isSidebarActive={isSidebarActive}
              setIsSidebarActive={setIsSidebarActive}
              setIsAuthenticated={setIsAuthenticated}
            />
          </div>
        </>
      )}

      <Routes>
        {/* Public Route - Login Page */}
        {!isAuthenticated &&
          publicRoutes.map(({ path, Component, needsProps }, index) => (
            <Route
              key={index}
              path={path}
              element={
                needsProps ? (
                  <Component setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Component />
                )
              }
            />
          ))}

        {/* Protected Routes */}
        {isAuthenticated ? (
          protectedRoutes.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <div
                  className="content"
                  style={{
                    width: isSidebarActive
                      ? "calc(100% - 92px)"
                      : "calc(100% - 250px)",
                    marginLeft: isSidebarActive ? "92px" : "250px",
                  }}
                >
                  <Component />
                </div>
              }
            />
          ))
        ) : (
          // Redirect any unauthorized access back to login
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
