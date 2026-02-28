import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const Item = ({ design, deleteDesign, type }) => {
  return (
    <div
      className={`relative group w-full ${type ? "h-[100px]" : "h-[160px] px-2"}`}
    >
      <Link
        to={`/design/${design._id}/edit`}
        className={`w-full h-full block bg-[#ffffff12] rounded-md ${type ? "" : "p-4"}`}
      >
        <img
          src={design.image_url}
          className="w-full h-full rounded-md overflow-hidden"
        />
      </Link>
      <div
        onClick={() => {
          deleteDesign(design._id);
        }}
        className="absolute hidden cursor-pointer top-2 right-4 text-red-500 transition-all duration-500 group-hover:block"
      >
        <FaTrashAlt />
      </div>
    </div>
  );
};

export default Item;
