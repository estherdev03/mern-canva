import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const SignupForm = ({ inputHandler, state }) => {
  return (
    <form action="">
      <div className="flex flex-col gap-2 mb-3 text-white ">
        <label htmlFor="name" className="font-semibold">
          Name
        </label>
        <input
          type="name"
          name="name"
          id="name"
          placeholder="John Doe"
          onChange={inputHandler}
          value={state.name}
          className="px-3 py-2 rounded-md outline-none border border-[#5c5c5e] focus:border-2 bg-transparent"
        />
        <label htmlFor="email" className="font-semibold">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="johndoe@gmail.com"
          onChange={inputHandler}
          value={state.email}
          className="px-3 py-2 rounded-md outline-none border border-[#5c5c5e] focus:border-2 bg-transparent"
        />
        <label htmlFor="password" className="font-semibold">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="*****************"
          onChange={inputHandler}
          value={state.password}
          className="px-3 py-2 rounded-md outline-none border border-[#5c5c5e] focus:border-2 bg-transparent"
        />
      </div>
      <div>
        <button className="px-3 py-2 rounded-md bg-purple-500 w-full outline-none hover:bg-purple-600 text-white">
          Sign up
        </button>
      </div>
      <div className="flex py-4 justify-betwen items-center px-3">
        <div className="w-[45%] h-[1px] bg-slate-500 mr-2"></div>
        <span className="w-[6%] text-center flex pb-1 text-white">Or</span>
        <div className="w-[45%] h-[1px] px-2 bg-slate-500 ml-2"></div>
      </div>
      <div className="flex flex-col gap-2">
        <button className="px-3 py-2 flex justify-center items-center gap-2 rounded-md bg-red-500 w-full outline-none hover:bg-red-600 text-white">
          <FaGoogle className="text-center" />
          <span>Login with Gmail</span>
        </button>
        <button className="px-3 py-2 flex justify-center items-center gap-2 rounded-md bg-blue-500 w-full outline-none hover:bg-blue-600 text-white">
          <FaFacebook className="text-center" />
          <span>Login with Facebook</span>
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
