import { useState } from "react";
import { Link } from "react-router-dom";
import * as htmlToImage from "html-to-image";
import api from "../utils/api";
import toast from "react-hot-toast";

const Header = ({ components, designId }) => {
  const [loading, setLoading] = useState(false);
  const downloadImage = async () => {
    const getDiv = document.getElementById("main_design");
    const dataUrl = await htmlToImage.toPng(getDiv, {
      style: {
        transform: "scale(1)",
      },
    });

    let link = document.createElement("a");
    link.download = "image";
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const saveImage = async () => {
    const getDiv = document.getElementById("main_design");
    const image = await htmlToImage.toBlob(getDiv);

    if (image) {
      const obj = {
        design: components,
      };

      const formData = new FormData();
      formData.append("design", JSON.stringify(obj));
      formData.append("image", image);
      try {
        setLoading(true);
        const { data } = await api.put(
          `/api/update-user-design/${designId}`,
          formData,
        );
        setLoading(false);
        toast.success(data.message);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="h-[60px] bg-linear-to-r from-[#212122] via-[#27282b] to-[#2a2b2c]">
      <div className="flex justify-between items-center px-10 text-gray-400 h-full">
        <Link to="/">
          <img
            className="w-full h-full"
            src="https://static.canva.com/web/images/8439b51bb7a19f6e65ce1064bc37c197.svg"
            alt="canva logo"
          />
        </Link>
        <span className="text-xl">Canva</span>
        <div className="flex justify-center items-center gap-2 ">
          <button
            disabled={loading}
            onClick={saveImage}
            className="px-3 py-[6px] outline-none bg-[#7482f6] rounded-md text-white cursor-pointer hover:bg-[#5563da] disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Save"}
          </button>

          <button
            onClick={downloadImage}
            className="px-3 py-[6px] outline-none bg-[#a955f7] rounded-md text-white cursor-pointer hover:bg-[#9f40f8]"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
