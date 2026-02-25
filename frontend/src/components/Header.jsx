import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
        <span className="text-xl">Easy Canva</span>
        <div className="flex justify-center items-center gap-2 ">
          <button className="px-3 py-[6px] outline-none bg-[#7482f6] rounded-md text-white">
            Save
          </button>
          <button className="px-3 py-[6px] outline-none bg-[#a955f7] rounded-md text-white">
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
