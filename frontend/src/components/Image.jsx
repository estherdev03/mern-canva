const Image = ({ addImage, images }) => {
  return (
    <div className="grid grid-cols-2 gap-2 ">
      {images.map((img, idx) => (
        <div
          onClick={() => addImage(img.image_url)}
          key={idx}
          className="w-full h-[90px] overflow-hidden rounded-md cursor-pointer"
        >
          <img className="w-full h-full" src={img.image_url} alt="" />
        </div>
      ))}
    </div>
  );
};

export default Image;
