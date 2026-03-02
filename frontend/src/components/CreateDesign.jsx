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
    <div className="w-screen min-h-screen flex justify-center items-center relative bg-gradient-to-br from-[#050816] via-[#020617] to-[#020617] text-slate-100">
      <div className="max-w-5xl w-full flex flex-col items-center justify-center gap-6 px-4">
        <div className="text-center space-y-2">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-50">
            Creating your new design
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            We’re preparing a fresh canvas for you based on your chosen size.
          </p>
        </div>
        <div className="relative rounded-xl border border-slate-800 bg-[#020617]/80 shadow-2xl p-4 sm:p-6 flex justify-center items-center">
          <div
            ref={ref}
            className="relative w-auto h-auto overflow-auto bg-slate-900/60 rounded-lg p-4"
          >
            <CreateComponent info={obj} current_component={{}} />
          </div>
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-black/60 rounded-xl">
              <FadeLoader color="white" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateDesign;
