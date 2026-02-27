import { useState } from "react";
import { IoClose } from "react-icons/io5";
import SignupForm from "../components/SignupForm";
import SigninForm from "../components/SigninForm";
const Index = () => {
  const [type, setType] = useState("");
  const [show, setShow] = useState(false);
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <div className="bg-[#18191b] min-h-screen w-full">
      <div
        className={`w-screen ${show ? "visible" : "invisible"} transition-all h-screen fixed bg-[rgba(31,32,34,0.55)] flex justify-center items-center`}
      >
        <div className="w-85 bg-[#323335] m-auto px-6 py-4 rounded-md relative">
          <div
            onClick={() => {
              setShow(false);
            }}
            className="absolute right-4 top-4 text-2xl cursor-pointer text-white"
          >
            <IoClose />
          </div>
          {type === "sign in" ? (
            <>
              <h2 className="mb-2 text-white text-lg text-center">Sign in</h2>
              <SigninForm
                inputHandler={inputHandler}
                state={state}
                setState={setState}
              />
            </>
          ) : (
            <>
              <h2 className="mb-2 text-white text-lg text-center">Sign up</h2>
              <SignupForm
                inputHandler={inputHandler}
                state={state}
                setState={setState}
              />
            </>
          )}
        </div>
      </div>
      <div className="bg-[#212223] shadow-md">
        <div className="w-[93%] m-auto py-3 ">
          <div className="flex justify-between items-center">
            <div className="w-[80px] h-[48px]">
              <img
                className="w-full h-full"
                src="https://static.canva.com/web/images/8439b51bb7a19f6e65ce1064bc37c197.svg"
                alt="canva logo"
              />
            </div>
            <div className="flex gap-4 ">
              <button
                onClick={() => {
                  setType("sign in");
                  setShow(true);
                }}
                className="py-2 w-20 text-center bg-blue-600  transition-all hover:bg-blue-700 rounded-[5px] font-semibold hover:cursor-pointer text-white"
              >
                Sign in
              </button>
              <button
                onClick={() => {
                  setType("sign up");
                  setShow(true);
                }}
                className="py-2 w-20 text-center bg-red-600  transition-all hover:bg-red-700 rounded-[5px] font-semibold hover:cursor-pointer text-white"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full justify-center items-center p-4 text-center">
        <div className="py-[170px] flex justify-center items-center flex-col gap-6">
          <h2 className="text-[#c7c5c5] text-3xl sm:text-4xl font-bold ">
            What will you design today?
          </h2>
          <span className="text-[#aca9a9] text-lg sm:text-2xl font-semibold ">
            Canva makes it easy to create and share professional designs
          </span>
          <button
            onClick={() => {
              setType("sign up");
              setShow(true);
            }}
            className="py-2 w-50 text-center bg-blue-600  transition-all hover:bg-blue-700 rounded-[5px] font-semibold hover:cursor-pointer text-white"
          >
            Sign up for Free
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
