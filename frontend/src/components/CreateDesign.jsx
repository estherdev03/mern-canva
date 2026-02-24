import { useRef } from "react";
import { useLocation } from "react-router-dom";
import CreateComponent from "./CreateComponent";

const CreateDesign = () => {
  const ref = useRef();
  const {
    state: { width, height },
  } = useLocation();

  //   Object payload
  const obj = {
    name: "main_frame",
    type: "rect",
    id: 1,
    width,
    height,
    z_index: 1,
    color: "green",
    image: "",
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <div ref={ref} className="relative w-auto h-auto overflow-auto">
        <CreateComponent info={obj} current_component={{}} />
      </div>
    </div>
  );
};

export default CreateDesign;
