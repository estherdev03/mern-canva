const Index = () => {
  return (
    <div className="bg-[#18191b] min-h-screen w-full ">
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
              <button className="py-2 w-20 text-center bg-blue-600  transition-all hover:bg-blue-700 rounded-[5px] font-semibold hover:cursor-pointer text-white">
                Sign in
              </button>
              <button className="py-2 w-20 text-center bg-red-600  transition-all hover:bg-red-700 rounded-[5px] font-semibold hover:cursor-pointer text-white">
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
          <button className="py-2 w-50 text-center bg-blue-600  transition-all hover:bg-blue-700 rounded-[5px] font-semibold hover:cursor-pointer text-white">
            Sign up for Free
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
