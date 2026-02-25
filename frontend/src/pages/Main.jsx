import React, { useState } from "react";
import Header from "./../components/Header";
import { LuLayoutTemplate } from "react-icons/lu";
import { FaShapes } from "react-icons/fa6";
import { IoMdCloudUpload } from "react-icons/io";
import { IoText } from "react-icons/io5";
import { IoMdFolderOpen } from "react-icons/io";
import { FaRegImages } from "react-icons/fa";
import { RxTransparencyGrid } from "react-icons/rx";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import TemplateDesign from "../components/main/TemplateDesign";

const Main = () => {
  const [state, setState] = useState("");
  const [show, setShow] = useState({ status: true, name: "" });
  const setElements = (type, name) => {
    setState(type);
    setShow({
      status: false,
      name,
    });
  };
  return (
    <div className="min-w-screen h-screen bg-black">
      <Header />
      <div className="flex h-[calc(100%-60px)] w-screen">
        <div className="w-[80px] bg-[#18191b] z-50 h-full text-gray-400 overflow-y-auto">
          <div
            onClick={() => setElements("design", "design")}
            className={`w-full h-[65px] cursor-pointer flex justify-center flex-col items-center gap-1 transition-all hover:text-gray-100 hover:bg-[#252627] ${show.name === "design" ? "bg-[#252627]" : ""}`}
          >
            <span>
              <LuLayoutTemplate />
            </span>
            <span className="text-xs font-medium">Design</span>
          </div>
          <div
            className={`w-full h-[65px] cursor-pointer flex justify-center flex-col items-center gap-1 transition-all hover:text-gray-100 hover:bg-[#252627] ${show.name === "shape" ? "bg-[#252627]" : ""}`}
            onClick={() => setElements("shape", "shape")}
          >
            <span>
              <FaShapes />
            </span>
            <span className="text-xs font-medium">Shapes</span>
          </div>
          <div
            className={`w-full h-[65px] cursor-pointer flex justify-center flex-col items-center gap-1 transition-all hover:text-gray-100 hover:bg-[#252627] ${show.name === "uploadImage" ? "bg-[#252627]" : ""}`}
            onClick={() => setElements("image", "uploadImage")}
          >
            <span>
              <IoMdCloudUpload />
            </span>
            <span className="text-xs font-medium">Upload</span>
          </div>
          <div
            className={`w-full h-[65px] cursor-pointer flex justify-center flex-col items-center gap-1 transition-all hover:text-gray-100 hover:bg-[#252627] ${show.name === "text" ? "bg-[#252627]" : ""}`}
            onClick={() => setElements("text", "text")}
          >
            <span>
              <IoText />
            </span>
            <span className="text-xs font-medium">Text</span>
          </div>
          <div
            className={`w-full h-[65px] cursor-pointer flex justify-center flex-col items-center gap-1 transition-all hover:text-gray-100 hover:bg-[#252627] ${show.name === "projects" ? "bg-[#252627]" : ""}`}
            onClick={() => setElements("projects", "projects")}
          >
            <span>
              <IoMdFolderOpen />
            </span>
            <span className="text-xs font-medium">Projects</span>
          </div>
          <div
            className={`w-full h-[65px] cursor-pointer flex justify-center flex-col items-center gap-1 transition-all hover:text-gray-100 hover:bg-[#252627] ${show.name === "images" ? "bg-[#252627]" : ""}`}
            onClick={() => setElements("initImage", "images")}
          >
            <span>
              <FaRegImages />
            </span>
            <span className="text-xs font-medium">Images</span>
          </div>
          <div
            className={`w-full h-[65px] cursor-pointer flex justify-center flex-col items-center gap-1 transition-all hover:text-gray-100 hover:bg-[#252627] ${show.name === "background" ? "bg-[#252627]" : ""}`}
            onClick={() => setElements("background", "background")}
          >
            <span>
              <RxTransparencyGrid />
            </span>
            <span className="text-xs font-medium">Background</span>
          </div>
        </div>
        <div className="h-full w-[calc(100%-75px)]">
          <div
            className={`${show.status ? "p-0 -left-[350px]" : "px-8 left-[75px] py-5"} bg-[#252627] h-full fixed transition-all w-[350px] z-30 duration-700`}
          >
            <div
              onClick={() => {
                setShow({ name: "", status: true });
              }}
              className="flex absolute justify-center items-center bg-[#252627] w-[20px] -right-2 text-slate-300 top-[40%] cursor-pointer h-[100px] rounded-full"
            >
              <MdOutlineKeyboardArrowLeft />
            </div>
            {state === "design" && (
              <div className="grid grid-cols-2 gap-2">
                <TemplateDesign type="main" />
              </div>
            )}
            {state === "shape" && <div>Shape</div>}
            {state === "image" && <div>image</div>}
            {state === "text" && <div>text</div>}
            {state === "projects" && <div>projects</div>}
            {state === "initImage" && <div>initImage</div>}
            {state === "background" && <div>background</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
