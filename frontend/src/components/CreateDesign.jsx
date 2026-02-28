import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CreateComponent from "./CreateComponent";
import * as htmlToImage from "html-to-image";
import api from "../utils/api";
import FadeLoader from "react-spinners/FadeLoader";

const CreateDesign = () => {
  const ref = useRef();
  const { state } = useLocation();

  const navigate = useNavigate();

  //Object payload
  const obj = {
    name: "main_frame",
    type: "rect",
    // eslint-disable-next-line react-hooks/purity
    id: Math.floor(Math.random() * 100 + 1),
    width: state.width,
    height: state.height,
    z_index: 1,
    color: "white",
    image: "",
  };

  const [loading, setLoading] = useState(false);
  const hasCreated = useRef(false);

  const createDesign = async () => {
    if (!ref.current) return;
    const image = await htmlToImage.toBlob(ref.current);
    const design = JSON.stringify(obj);
    if (image) {
      const formData = new FormData();
      formData.append("design", design);
      formData.append("image", image);
      try {
        setLoading(true);
        const { data } = await api.post("/api/create-user-design", formData);
        setLoading(false);
        navigate(`/design/${data.design._id}/edit`);
      } catch (error) {
        setLoading(false);
        console.log(error.response.data);
      }
    }
  };

  useEffect(() => {
    if (!state) {
      navigate("/");
      return;
    }
    if (!ref.current || hasCreated.current) return;
    hasCreated.current = true;
    createDesign();
  }, [state]);

  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <div ref={ref} className="relative w-auto h-auto overflow-auto">
        <CreateComponent info={obj} current_component={{}} />
      </div>
      {loading && (
        <div className="left-0 top-0 h-full w-full flex justify-center items-center bg-black absolute">
          <FadeLoader color="white" />
        </div>
      )}
    </div>
  );
};

export default CreateDesign;
