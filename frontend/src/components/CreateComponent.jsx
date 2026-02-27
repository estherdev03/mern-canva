import { FaTrashAlt } from "react-icons/fa";
import Element from "./Element";

const CreateComponent = ({ info, currentComponent, removeComponent }) => {
  // eslint-disable-next-line react-hooks/purity
  const randValue = Math.floor(Math.random() * 100);

  let html = "";

  if (info.name === "main_frame") {
    html = (
      <div
        onClick={() => info.setCurrentComponent(info)}
        className="hover:border-[2px] hover:border-indigo-500 shadow-md"
        style={{
          width: info.width + "px",
          height: info.height + "px",
          background: info.color,
          zIndex: info.z_index,
        }}
      >
        {info.image && <img className="w-full h-full" src={info.image} />}
      </div>
    );
  }

  // Shape
  if (info.name === "shape" && info.type === "rect") {
    html = (
      <div
        id={randValue}
        onClick={() => {
          info.setCurrentComponent(info);
        }}
        style={{
          width: info.width + "px",
          height: info.height + "px",
          background: info.color,
          opacity: info.opacity,
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
      >
        <Element id={randValue} info={info} exId="" />
        {currentComponent.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-1 absolute w-fit bg-white text-[12px] hover:text-red-500 top-0 hidden group-hover:block cursor-pointer rounded-sm"
          >
            <FaTrashAlt />
          </div>
        )}
      </div>
    );
  }
  if (info.name === "shape" && info.type === "circle") {
    html = (
      <div
        id={randValue}
        onClick={() => {
          info.setCurrentComponent(info);
        }}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
      >
        <div
          id={`${randValue}c`}
          className="rounded-full"
          style={{
            width: info.width + "px",
            height: info.width + "px",
            background: info.color,
            opacity: info.opacity,
          }}
        ></div>
        <Element id={randValue} info={info} exId={`${randValue}c`} />
        {currentComponent.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-1 w-fit bg-white absolute text-[12px] hover:text-red-500 top-0 hidden group-hover:block cursor-pointer rounded-sm"
          >
            <FaTrashAlt />
          </div>
        )}
      </div>
    );
  }
  if (info.name === "shape" && info.type === "triangle") {
    html = (
      <div
        id={randValue}
        onClick={() => {
          info.setCurrentComponent(info);
        }}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
      >
        <div
          id={`${randValue}t`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
          }}
        ></div>
        <Element id={randValue} info={info} exId={`${randValue}t`} />
        {currentComponent.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-1 w-fit bg-white absolute text-[12px] hover:text-red-500 top-0 hidden group-hover:block cursor-pointer rounded-sm"
          >
            <FaTrashAlt />
          </div>
        )}
      </div>
    );
  }

  // Text
  if (info.name === "text") {
    html = (
      <div
        id={randValue}
        onClick={() => {
          info.setCurrentComponent(info);
        }}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
          color: info.color,
          opacity: info.opacity,
          padding: info.padding != null ? `${info.padding}px` : undefined,
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
      >
        <Element id={randValue} info={info} exId="" />
        <h2
          style={{ fontSize: info.font + "px", fontWeight: info.weight }}
          className="w-full h-full"
        >
          {info.title}
        </h2>
        {currentComponent.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="absolute px-1 py-1 w-fit bg-white text-[12px] hover:text-red-500 hidden group-hover:block cursor-pointer rounded-sm top-0 left-0 text-black"
          >
            <FaTrashAlt />
          </div>
        )}
      </div>
    );
  }

  // Image
  if (info.name === "image") {
    html = (
      <div
        id={randValue}
        onClick={() => {
          info.setCurrentComponent(info);
        }}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
          opacity: info.opacity,
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
      >
        <Element id={randValue} info={info} exId={`${randValue}img`} />
        <div
          className="overflow-hidden"
          id={`${randValue}img`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            borderRadius: `${info.radius}%`,
          }}
        >
          <img className="w-full h-full" src={info.image} alt="image" />
        </div>
        {currentComponent.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-2 py-1 w-fit bg-white absolute text-[12px] hover:text-red-500 top-0 hidden group-hover:block cursor-pointer rounded-sm"
          >
            <FaTrashAlt />
          </div>
        )}
      </div>
    );
  }

  return html;
};

export default CreateComponent;
