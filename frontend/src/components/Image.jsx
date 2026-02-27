import React from "react";

const Image = ({ addImage }) => {
  return (
    <div className="grid grid-cols-2 gap-2 ">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((img, idx) => (
        <div
          onClick={() => addImage("../../canva.png")}
          key={idx}
          className="w-full h-[90px] overflow-hidden rounded-md cursor-pointer"
        >
          <img className="w-full h-full" src="../../canva.png" alt="" />
        </div>
      ))}
    </div>
  );
};

export default Image;
