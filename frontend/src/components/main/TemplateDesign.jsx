const TemplateDesign = () => {
  return (
    <>
      {[1, 2, 3, 4].map((design, idx) => (
        <div
          key={idx}
          className={`group w-full rounded-md overflow-hidden bg-[#ffffff] cursor-pointer`}
        >
          <img src="../../canva.png" alt="placeholder image" />
        </div>
      ))}
    </>
  );
};
export default TemplateDesign;
