import { useEffect, useState } from "react";
import api from "../utils/api";
import Item from "./home/Item";
import toast from "react-hot-toast";

const Project = ({ designId, type }) => {
  const [designs, setDesigns] = useState([]);

  const deleteDesign = async (designId) => {
    try {
      const { data } = await api.put(`api/delete-user-image/${designId}`);
      toast.success(data.message);
      const rest = (await api.get("/api/get-user-designs")).data.designs;
      setDesigns([...rest]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const getUserDesign = async () => {
      try {
        const { data } = await api.get("/api/get-user-designs");
        setDesigns(data.designs);
      } catch (error) {
        console.log(error);
      }
    };
    getUserDesign();
  }, []);

  return (
    <div className="pl-4 h-full overflow-x-auto flex justify-start items-start scrollbar-hide w-full">
      <div
        className={`grid ${type ? "grid-cols-2 gap-5" : "grid-cols-4 gap-2"}  mt-5 w-full`}
      >
        {designs.map(
          (design, idx) =>
            design._id !== designId && (
              <Item
                key={idx}
                design={design}
                deleteDesign={deleteDesign}
                type={type}
              />
            ),
        )}
      </div>
    </div>
  );
};

export default Project;
