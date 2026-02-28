import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

import Item from "./home/Item";
import toast from "react-hot-toast";

const Home = () => {
  const [designs, setDesigns] = useState([]);
  const [show, setShow] = useState(false);
  const [state, setState] = useState({
    width: 0,
    height: 0,
  });

  const navigate = useNavigate();

  const inputHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const createDesign = (e) => {
    e.preventDefault();
    navigate("/design/create", {
      state: {
        type: "create",
        ...state,
      },
    });
  };

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

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="pt-2 pl-4">
      <div className="w-full flex justify-center items-center h-[250px] bg-linear-to-r from-[#4c76cf] to-[#552ab8] rounded-md relative overflow-hidden">
        <button
          onClick={() => {
            setShow(!show);
          }}
          className="px-4 py-2 text-[15px] overflow-hidden text-center bg-purple-400 text-white rounded-md font-medium hover:bg-purple-500 absolute top-3 right-3 hover:cursor-pointer"
        >
          Custom size
        </button>
        <form
          className={`absolute top-16 right-3 gap-3 bg-[#252627] w-[250px] p-4 text-white ${show ? "visible opacity-100" : "invisible"} transition duration-500`}
          onSubmit={createDesign}
        >
          <div className="grid grid-cols-2 pb-4 gap-3">
            <div className="flex gap-2 justify-center items-start flex-col">
              <label htmlFor="width">Width</label>
              <input
                onChange={inputHandler}
                value={state.width}
                type="number"
                id="width"
                name="width"
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full outline-none px-2 py-[4px] bg-[#1b1a1a] border border-[#404040] rounded-md"
              />
            </div>
            <div className="flex gap-2 justify-center items-start flex-col">
              <label htmlFor="height">Height</label>
              <input
                onChange={inputHandler}
                value={state.height}
                type="number"
                id="height"
                name="height"
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full outline-none px-2 py-[4px] bg-[#1b1a1a] border border-[#404040] rounded-md"
              />
            </div>
          </div>
          <button className="px-4 py-2 text-[15px] overflow-hidden text-center bg-purple-400 text-white rounded-sm font-medium hover:bg-purple-500 w-full hover:cursor-pointer">
            Create new design
          </button>
        </form>
        <div>
          <h2 className="text-3xl pb-10 pt-6 font-semibold text-white">
            What will you design today?
          </h2>
        </div>
      </div>
      <div className="">
        <h2 className="text-xl py-4 font-semibold text-white">
          Your recent designs
        </h2>
        <div>
          <Carousel
            autoPlay={true}
            infinite={true}
            responsive={responsive}
            transitionDuration={500}
            itemClass="px-2"
            containerClass="w-full flex"
          >
            {designs.length > 0 &&
              designs.map((d, i) => (
                <Item key={i} design={d} deleteDesign={deleteDesign} />
              ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Home;
