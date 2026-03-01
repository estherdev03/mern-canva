import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

const TemplateDesign = ({ type }) => {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getTemplates = async () => {
      try {
        const { data } = await api.get("/api/get-templates");
        setTemplates(data.templates);
      } catch (error) {
        console.log(error);
      }
    };
    getTemplates();
  }, []);

  const addTemplate = async (id) => {
    try {
      const { data } = await api.get(`/api/add-user-template/${id}`);
      navigate(`/design/${data.design._id}/edit`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={`grid gap-2 ${type ? "grid-cols-2" : "grid-cols-4 mt-5"}`}
      >
        {templates.map((template, idx) => (
          <div
            onClick={() => {
              addTemplate(template._id);
            }}
            key={idx}
            className={`relative cursor-pointer group w-full ${type ? "h-[100px]" : "160px px-4"}`}
          >
            <div
              className={`w-full h-full block bg-slate-400 rounded-md ${type ? "" : "p-4"}`}
            >
              <img
                src={template.image_url}
                className="w-full h-full rounded-md overflow-hidden"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default TemplateDesign;
