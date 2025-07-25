import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SiderNav from "./component/sidenav/SiderNav";
import { useState, useEffect } from "react";
import { protectedRoutes, publicRoutes } from "./utils/routes";
import Cookies from "js-cookie";
import Header from "./component/Header/Header";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  useEffect(() => {
    const access_token = Cookies.get("a_token");
    const refesh_token = Cookies.get("r_token");
    if (access_token || refesh_token) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

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
