import { useEffect, useState } from "react";
import Image from "./Image";
import api from "../utils/api";

const BackgroundImages = ({ type, setImg, currentComponent }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      try {
        const { data } = await api.get("/api/get-background-images");
        setImages(data.images);
      } catch (error) {
        console.log(error);
      }
    };
    getImages();
  }, []);
  return (
    <Image
      images={images}
      type={type}
      setImg={setImg}
      currentComponent={currentComponent}
    />
  );
};

export default BackgroundImages;
