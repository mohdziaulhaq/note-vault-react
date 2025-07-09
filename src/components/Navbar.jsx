import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useMyContext } from "../store/ContextApi";

const Navbar = () => {
  const [headerToggle, setHeaderToggle] = useState(false);
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  const { token, setToken, setCurrentUser, isAdmin, setIsAdmin } = useMyContext();

  const handleLogout = () => {
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("USER");
    localStorage.removeItem("CSRF_TOKEN");
    localStorage.removeItem("IS_ADMIN");

    setToken(null);
    setCurrentUser(null);
    setIsAdmin(false);
    navigate("/login");
  };

  return (
    <header className="h-16 z-50 text-white bg-gray-800 shadow-sm flex items-center sticky top-0">
      <nav className="sm:px-10 px-4 flex w-full h-full items-center justify-between">
        <Link to="/">
          <h3 className="text-xl font-bold">Secure Notes</h3>
        </Link>

        <ul
          className={`lg:static absolute left-0 top-16 w-full lg:w-fit lg:px-0 sm:px-10 px-4 bg-gray-800 ${
            headerToggle ? "py-4 shadow-md" : "h-0 overflow-hidden"
          } lg:h-auto transition-all duration-100 font-semibold text-white flex lg:flex-row flex-col lg:gap-8 gap-2`}
        >
          {token && (
            <>
              <Link to="/notes">
                <li className={`py-2 cursor-pointer hover:text-slate-300 ${pathName === "/notes" ? "underline" : ""}`}>
                  My Notes
                </li>
              </Link>
              <Link to="/create-note">
                <li className={`py-2 cursor-pointer hover:text-slate-300 ${pathName === "/create-note" ? "underline" : ""}`}>
                  Create Note
                </li>
              </Link>
            </>
          )}
          <Link to="/contact">
            <li className={`py-2 cursor-pointer hover:text-slate-300 ${pathName === "/contact" ? "underline" : ""}`}>
              Contact
            </li>
          </Link>
          <Link to="/about">
            <li className={`py-2 cursor-pointer hover:text-slate-300 ${pathName === "/about" ? "underline" : ""}`}>
              About
            </li>
          </Link>

          {token ? (
            <>
              <Link to="/profile">
                <li className={`py-2 cursor-pointer hover:text-slate-300 ${pathName === "/profile" ? "underline" : ""}`}>
                  Profile
                </li>
              </Link>
              {isAdmin && (
                <Link to="/admin/users">
                  <li className={`py-2 cursor-pointer uppercase hover:text-slate-300 ${pathName.startsWith("/admin") ? "underline" : ""}`}>
                    Admin
                  </li>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="w-24 text-center bg-red-500 font-semibold px-4 py-2 rounded-sm hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/signup">
              <li className="w-24 text-center bg-blue-600 font-semibold px-4 py-2 rounded-sm hover:bg-blue-700">
                Sign Up
              </li>
            </Link>
          )}
        </ul>

        <span onClick={() => setHeaderToggle(!headerToggle)} className="lg:hidden block cursor-pointer text-white">
          {headerToggle ? <RxCross2 className="text-2xl" /> : <IoMenu className="text-2xl" />}
        </span>
      </nav>
    </header>
  );
};

export default Navbar;
