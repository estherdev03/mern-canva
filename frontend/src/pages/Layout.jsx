import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaFolderOpen } from "react-icons/fa";
import { HiTemplate } from "react-icons/hi";
import api from "../utils/api";
import toast from "react-hot-toast";

const Layout = () => {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await api.get("/api/user");
        setUser(data.user);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getUser();
  }, []);

  const createDesign = (e) => {
    e.preventDefault();
    navigate("/design/create", {
      state: {
        type: "create",
        width: 500,
        height: 400,
      },
    });
  };

  const logout = () => {
    localStorage.removeItem("canva_token");
    window.location.href = "/";
  };

  return (
    <div className="bg-[#18191b] min-h-screen w-full flex flex-col">
      {/* Header */}
      <div className="bg-[#212223] shadow-md w-full h-18">
        <div className="w-[93%] m-auto py-3">
          <div className="flex justify-between items-center">
            <div className="w-[80px] h-[48px]">
              <img
                className="w-full h-full"
                src="https://static.canva.com/web/images/8439b51bb7a19f6e65ce1064bc37c197.svg"
                alt="canva logo"
              />
            </div>
            <div className="flex gap-4 justify-center items-center relative">
              <button
                onClick={createDesign}
                className="py-2 px-3 overflow-hidden text-center bg-[#8b3dff] rounded-md font-semibold text-white hover:cursor-pointer hover:bg-[#6d3bb8]"
              >
                Create a design
              </button>
              <div
                onClick={() => {
                  setShow(!show);
                }}
                className="cursor-pointer "
              >
                <img
                  className="w-[48px] h-[45px] rounded-full"
                  src="https://res.cloudinary.com/devllaqhm/image/upload/v1772358750/istockphoto-2151669184-612x612_bjkchv.jpg"
                  alt="avatar placeholder"
                />
              </div>
              <div
                className={`absolute border border-gray-700 top-[60px] right-0 w-[250px] bg-[#313030] p-3  transition duration-500 ${show ? "visible opacity-100 z-100" : "invisible opacity-30"}`}
              >
                <div className="px-2 py-2 flex justify-start gap-5 items-center">
                  <img
                    className="w-[40px] h-[40px] rounded-full"
                    src="https://res.cloudinary.com/devllaqhm/image/upload/v1772358750/istockphoto-2151669184-612x612_bjkchv.jpg"
                    alt="avatar placeholder"
                  />
                  <div className="flex justify-center flex-col items-start ">
                    <span className="text-[#e0dddd] font-bold">
                      {user.name}
                    </span>
                    <span className="text-[#e0dddd] text-sm">{user.email}</span>
                  </div>
                </div>
                <ul className="text-[#e0dddd] font-semibold">
                  <li>
                    <div
                      onClick={logout}
                      className="p-2 cursor-pointer hover:text-blue-300"
                    >
                      <span>Logout</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="w-full grow grid grid-cols-[1fr_3fr] md:grid-cols-[250px_1fr]">
        <div className="sidebar p-5 bg-[#34569f]">
          <div className=" flex flex-col items-center gap-3 mb-3 md:flex-row">
            <img
              className="w-[48px] h-[48px] rounded-full"
              src="https://res.cloudinary.com/devllaqhm/image/upload/v1772358750/istockphoto-2151669184-612x612_bjkchv.jpg"
              alt="avatar placeholder"
            />
            <div className="flex justify-center items-center text-center flex-col *:text-[#e0dddd]">
              <span className="font-bold text-sm md:text-lg">{user.name}</span>
              <span className="bg-red-500 rounded-md px-2 text-[10px] font-semibold text-center mt-1 ">
                Free
              </span>
            </div>
          </div>
          <ul className="flex flex-col gap-4 pt-2">
            <li>
              <Link
                to="/"
                className={`text-[#e0dddd] px-2 py-2 flex justify-start items-center gap-2 ${pathname === "/" ? "bg-[#ffffff26]" : ""} rounded-md`}
              >
                <span>
                  <IoMdHome size={20} />
                </span>
                <span className="font-semibold">Home</span>
              </Link>
            </li>

            <li>
              <Link
                to="/projects"
                className={`text-[#e0dddd] px-2 py-2 flex justify-start items-center gap-2 ${pathname === "/projects" ? "bg-[#ffffff26]" : ""} rounded-md`}
              >
                <span>
                  <FaFolderOpen size={19} />
                </span>
                <span className="font-semibold">Projects</span>
              </Link>
            </li>
            <li>
              <Link
                to="/templates"
                className={`text-[#e0dddd] px-2 py-2 flex justify-start items-center gap-2 ${pathname === "/templates" ? "bg-[#ffffff26]" : ""} rounded-md`}
              >
                <span>
                  <HiTemplate size={20} />
                </span>
                <span className="font-semibold">Templates</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="min-w-0">
          <div className="py-4 pr-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
