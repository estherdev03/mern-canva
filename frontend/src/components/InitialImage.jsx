import Image from "./Image";
import api from "../utils/api";
import { useEffect, useState } from "react";

const InitialImage = ({ addImage }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      try {
        const { data } = await api.get("/api/get-design-images");
        setImages(data.images);
      } catch (error) {
        console.log(error);
      }
    };
    getImages();
  }, []);

  return <Image addImage={addImage} images={images} />;
};

export default InitialImage;
