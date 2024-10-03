import React, { Children } from "react";
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";

function MainLayout({ children }) {
  const navigate = useNavigate();
  function handleLogout(event) {
    event.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }
  return (
    <div>
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        <a
          href=""
          className="text-lg font-semibold hover:text-gray-300 transition duration-300 ml-4"
        >
          Menu
        </a>
        <nav className="mr-4">
          <button
            onClick={handleLogout}
            className="flex items-center bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300"
          >
            <RiLogoutCircleRLine className="mr-2 text-xl" /> Logout
          </button>
        </nav>
      </header>

      {children}
    </div>
  );
}

export default MainLayout;
