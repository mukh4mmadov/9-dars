import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

  function PrivateRoute({ isAuth, children }) {
    useEffect(() => {
      if (!isAuth) {
        navigate("/login");
      }
    }, [isAuth, navigate]);

    return isAuth ? children : null;
  }

  useEffect(() => {
    if (
      !token &&
      location.pathname !== "/register" &&
      location.pathname !== "/login"
    ) {
      navigate("/login");
    }
  }, [token, navigate, location]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && storedToken !== token) {
      setToken(storedToken);
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute isAuth={!!token}>
              <MainLayout>
                <Home />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
