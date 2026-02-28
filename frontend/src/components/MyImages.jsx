import { useEffect, useState } from "react";
import Image from "./Image";
import BarLoader from "react-spinners/BarLoader";
import api from "../utils/api";
import toast from "react-hot-toast";

const MyImages = ({ addImage }) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const uploadImage = async (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      try {
        setLoading(true);
        const { data } = await api.post("/api/add-user-image", formData);
        setImages([...images, data.userImage]);
        setLoading(false);
        toast.success(data.message);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    const getImages = async () => {
      try {
        const { data } = await api.get("/api/get-user-image");
        setImages(data.images);
      } catch (error) {
        console.log(error);
      }
    };
    getImages();
  }, []);

  return (
    <div>
      <div className="h-[40px] flex justify-center items-center bg-purple-500 rounded-md text-white mb-3">
        <label className="text-center cursor-pointer w-full" htmlFor="image">
          Upload Image
        </label>
        <input
          readOnly={loading}
          onChange={uploadImage}
          type="file"
          id="image"
          className="hidden"
        />
      </div>
      {loading && (
        <div className="flex justify-center items-center mb-2 ">
          <BarLoader color="white" />
        </div>
      )}
      <div className="h-[80vh] overflow-x-auto flex justify-start items-start scrollbar-hide">
        <Image addImage={addImage} images={images} />
      </div>
    </div>
  );
};

export default MyImages;
