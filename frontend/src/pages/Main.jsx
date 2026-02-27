/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
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
import MyImages from "../components/MyImages";
import Project from "../components/Project";
import Image from "../components/Image";
import CreateComponent from "../components/CreateComponent";

const Main = () => {
  const [state, setState] = useState("");
  const [show, setShow] = useState({ status: true, name: "" });
  const [currentComponent, setCurrentComponent] = useState("");
  const [color, setColor] = useState("");
  const [img, setImg] = useState("");

  const [left, setLeft] = useState("");
  const [top, setTop] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const [padding, setPadding] = useState("");
  const [font, setFont] = useState("");
  const [weight, setWeight] = useState("");
  const [text, setText] = useState("");
  const [opacity, setOpacity] = useState("");
  const [zIndex, setZIndex] = useState("");

  const [rotate, setRotate] = useState("");
  const [components, setComponents] = useState([
    {
      name: "main_frame",
      type: "rect",
      // eslint-disable-next-line react-hooks/purity
      id: Math.floor(Math.random() * 100 + 1),
      height: 300,
      width: 350,
      z_index: 1,
      color: "#ffff",
      image: "",
      setCurrentComponent: (a) => setCurrentComponent(a),
    },
  ]);

  const moveElement = (id, currentInfo) => {
    setCurrentComponent(currentInfo);
    let isMoving = true;

    const currentDiv = document.getElementById(id);

    const mouseMove = ({ movementX, movementY }) => {
      const getStyle = window.getComputedStyle(currentDiv);
      const left = parseInt(getStyle.left);
      const top = parseInt(getStyle.top);
      if (isMoving) {
        currentDiv.style.left = `${left + movementX}px`;
        currentDiv.style.top = `${top + movementY}px`;
      }
    };
    const mouseUp = (e) => {
      isMoving = false;
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      setLeft(parseInt(currentDiv.style.left));
      setTop(parseInt(currentDiv.style.top));
    };
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
  };

  const resizeElement = (id, currentInfo) => {
    setCurrentComponent(currentInfo);
    let isMoving = true;

    const currentDiv = document.getElementById(id);

    const mouseMove = ({ movementX, movementY }) => {
      const getStyle = window.getComputedStyle(currentDiv);
      const width = parseInt(getStyle.width);
      const height = parseInt(getStyle.height);
      if (isMoving) {
        currentDiv.style.width = `${width + movementX}px`;
        currentDiv.style.height = `${height + movementY}px`;
      }
    };
    const mouseUp = (e) => {
      isMoving = false;
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      setWidth(parseInt(currentDiv.style.width));
      setHeight(parseInt(currentDiv.style.height));
    };
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
  };

  const rotateElement = (id, currentInfo, e) => {
    setCurrentComponent("");
    setCurrentComponent(currentInfo);
    const target = document.getElementById(id);
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const getAngle = (clientX, clientY) =>
      Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);

    let startAngle = getAngle(e.clientX, e.clientY);
    let currentAngle = Number(currentInfo.rotate) || 0;

    const mouseMove = (moveEvent) => {
      const angle = getAngle(moveEvent.clientX, moveEvent.clientY);
      const delta = angle - startAngle;
      startAngle = angle;
      currentAngle += delta;
      target.style.transform = `rotate(${currentAngle}deg)`;
    };
    const mouseUp = () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      setRotate(currentAngle);
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
  };

  const removeComponent = (id) => {
    const rest = components.filter((c) => c.id !== id);
    setComponents([...rest]);
    setCurrentComponent("");
  };

  const removeBackground = () => {
    const curr = components.find((c) => c.id === currentComponent.id);
    const rest = components.filter((c) => c.id !== currentComponent.id);
    curr.image = "";
    setImg("");
    setComponents([...rest, curr]);
  };

  const setElements = (type, name) => {
    setState(type);
    setShow({
      status: false,
      name,
    });
  };

  const createShape = (name, type) => {
    const style = {
      id: Date.now(),
      name,
      type,
      left: 10,
      top: 10,
      opacity: 1,
      width: 200,
      height: 150,
      rotate,
      z_index: 2,
      color: "#3c3c3d",
      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement,
    };
    setComponents([...components, style]);
  };

  const addText = (name, type) => {
    const style = {
      id: Date.now(),
      name,
      type,
      left: 10,
      top: 10,
      opacity: 1,
      rotate,
      z_index: 10,
      padding: 6,
      font: 22,
      title: "Add your text",
      weight: 400,
      color: "#3c3c3d",
      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement,
    };
    setFont("");
    setWeight("");
    setCurrentComponent(style);
    setComponents([...components, style]);
  };

  const opacityHandler = (e) => {
    setOpacity(parseFloat(e.target.value));
  };

  useEffect(() => {
    if (currentComponent) {
      const index = components.findIndex((c) => c.id === currentComponent.id);
      if (index === -1) return;

      const temp = components.filter((c) => c.id !== currentComponent.id);
      const updatedComponent = { ...components[index] };

      if (currentComponent.name === "main_frame" && img) {
        updatedComponent.image = img || currentComponent.image;
      }

      if (currentComponent.name !== "main_frame") {
        if (left !== "") updatedComponent.left = left;
        if (top !== "") updatedComponent.top = top;
        if (opacity !== "") updatedComponent.opacity = opacity;
        if (zIndex !== "") updatedComponent.z_index = zIndex;
      }

      if (currentComponent.name !== "text") {
        if (width !== "") updatedComponent.width = width;
        if (height !== "") updatedComponent.height = height;
        if (rotate !== "" && rotate !== 0) updatedComponent.rotate = rotate;
      }

      if (currentComponent.name === "text") {
        if (padding !== "") updatedComponent.padding = padding;
        if (font !== "") updatedComponent.font = font;
        if (weight !== "") updatedComponent.weight = weight;
        if (text !== "") updatedComponent.title = text;
      }

      if (color !== "") updatedComponent.color = color;

      setComponents([...temp, updatedComponent]);
      setCurrentComponent(updatedComponent);
      setLeft("");
      setTop("");
      setColor("");
      setWidth("");
      setHeight("");
      setRotate(0);
      setOpacity("");
      setZIndex("");
      setPadding("");
      setFont("");
      setWeight("");
      setText("");
    }
  }, [
    color,
    img,
    left,
    top,
    width,
    height,
    rotate,
    opacity,
    zIndex,
    padding,
    font,
    weight,
    text,
  ]);

  return (
    <div className="min-w-screen h-screen bg-black">
      <Header />
      <div className="flex h-[calc(100%-60px)] w-screen">
        {/* Sidebar */}
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

        {/* Main content */}
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
            {state === "shape" && (
              <div className="grid grid-cols-3 gap-2">
                <div
                  className="h-[90px] bg-[#3c3c3d] cursor-pointer"
                  onClick={() => {
                    createShape("shape", "rect");
                  }}
                ></div>
                <div
                  className="h-[90px] bg-[#3c3c3d] cursor-pointer rounded-full"
                  onClick={() => {
                    createShape("shape", "circle");
                  }}
                ></div>
                <div
                  onClick={() => {
                    createShape("shape", "triangle");
                  }}
                  style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
                  className="h-[90px] bg-[#3c3c3d] cursor-pointer "
                ></div>
              </div>
            )}
            {state === "image" && <MyImages />}
            {state === "text" && (
              <div>
                <div className="grid grid-cols-1 gap-2">
                  <div
                    onClick={() => addText("text", "title")}
                    className="bg-[#3c3c3d] cursor-pointer font-bold p-3 text-white text-xl rounded-sm"
                  >
                    <h2>Add a text</h2>
                  </div>
                </div>
              </div>
            )}
            {state === "projects" && <Project />}
            {state === "initImage" && (
              <div className="h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide">
                <Image />
              </div>
            )}
            {state === "background" && (
              <div className="h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide w-full">
                <div className="grid grid-cols-2 gap-2 w-full">
                  {[1, 2, 3, 4, 5].map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        currentComponent && setImg("../../canva.png");
                      }}
                      className="w-full h-[90px] overflow-hidden rounded-sm cursor-pointer"
                    >
                      <img
                        className="w-full h-full object-fill"
                        src="../../canva.png"
                        alt="placeholder"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="w-full flex h-full">
            <div
              className={`flex justify-center relative items-center h-full ${!currentComponent ? "w-full" : "w-[calc(100%-250px)]"} overflow-hidden`}
            >
              <div className="flex justify-center items-center overflow-hidden">
                <div
                  id="main_design"
                  className="w-auto relative h-auto overflow-hidden"
                >
                  {components.map((c, i) => (
                    <CreateComponent
                      key={i}
                      info={c}
                      currentComponent={currentComponent}
                      removeComponent={removeComponent}
                    />
                  ))}
                </div>
              </div>
            </div>

            {currentComponent && (
              <div className="h-full w-[250px] text-gray-300 bg-[#252627] px-3 py-2">
                <div className="flex gap-6 flex-col items-start h-full px-3 justify-start">
                  <div className="flex gap-4 justify-start items-start mt-4">
                    <span>Color: </span>
                    <label
                      htmlFor="color"
                      className="w-[30px] h-[30px] cursor-pointer rounded-sm"
                      style={{
                        background: ` ${
                          currentComponent.color &&
                          currentComponent.color !== "#ffff"
                            ? currentComponent.color
                            : "gray"
                        }`,
                      }}
                    ></label>
                    <input
                      type="color"
                      id="color"
                      onChange={(e) => setColor(e.target.value)}
                      className="invisible"
                    />
                  </div>
                  {currentComponent.name === "main_frame" &&
                    currentComponent.image && (
                      <div
                        onClick={removeBackground}
                        className="p-[6px] bg-slate-600 text-white cursor-pointer hover:bg-slate-500 rounded-sm"
                      >
                        Remove background
                      </div>
                    )}
                  {currentComponent.name !== "main_frame" && (
                    <div className="flex gap-6 flex-col">
                      <div className="flex gap-1 justify-start items-start">
                        <span className="text-md w-[70px]">Opacity:</span>
                        <input
                          type="number"
                          className="w-[65px] border border-gray-700 bg-transparent outline-none px-2 rounded-md py-1 text-sm"
                          step={0.1}
                          min={0.1}
                          max={1}
                          value={currentComponent.opacity}
                          onChange={opacityHandler}
                        />
                      </div>
                      <div className="flex gap-1 justify-start items-start">
                        <span className="text-md w-[70px]">Z-Index:</span>
                        <input
                          type="number"
                          className="w-[65px] border border-gray-700 bg-transparent outline-none px-2 rounded-md py-1 text-sm"
                          step={1}
                          value={currentComponent.z_index}
                          onChange={(e) => {
                            setZIndex(e.target.value);
                          }}
                        />
                      </div>
                      {currentComponent.name === "text" && (
                        <>
                          <div className="flex gap-1 justify-start items-start">
                            <span className="text-md w-[70px]">Padding:</span>
                            <input
                              type="number"
                              className="w-[65px] border border-gray-700 bg-transparent outline-none px-2 rounded-md py-1 text-sm"
                              step={1}
                              value={currentComponent.padding}
                              onChange={(e) => {
                                setPadding(e.target.value);
                              }}
                            />
                          </div>
                          <div className="flex gap-1 justify-start items-start">
                            <span className="text-md w-[70px]">Font Size:</span>
                            <input
                              type="number"
                              className="w-[65px] border border-gray-700 bg-transparent outline-none px-2 rounded-md py-1 text-sm"
                              step={1}
                              value={currentComponent.font}
                              onChange={(e) => {
                                setFont(e.target.value);
                              }}
                            />
                          </div>
                          <div className="flex gap-1 justify-start items-start">
                            <span className="text-md w-[70px]">Weight:</span>
                            <input
                              type="number"
                              className="w-[65px] border border-gray-700 bg-transparent outline-none px-2 rounded-md py-1 text-sm"
                              step={100}
                              min={100}
                              max={900}
                              value={currentComponent.weight}
                              onChange={(e) => {
                                setWeight(e.target.value);
                              }}
                            />
                          </div>
                          <div className="flex gap-2 flex-col justify-start items-start">
                            <input
                              type="text"
                              className="border bordergary700
                               bg-transparent outline-none p-2 rounded-md"
                              value={currentComponent.title}
                              onChange={(e) => {
                                setCurrentComponent({
                                  ...currentComponent,
                                  title: e.target.value,
                                });
                              }}
                            />
                            <button
                              onClick={() => {
                                setText(currentComponent.title);
                              }}
                              className="px-4 py-2 bg-purple-500 text-xs text-white rounded-sm"
                            >
                              Add Text
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
