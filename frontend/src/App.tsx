import Elements from "./components/Elements";
import TextIcon from "./assets/text-svgrepo-com.svg";
import ProfileViewsIcon from "./assets/telescope-svgrepo-com.svg";
import SocialMediaIcon from "./assets/hashtag-square-svgrepo-com.svg";
import StatsIcon from "./assets/stats-svgrepo-com.svg";
import TechsIcon from "./assets/chip-component-svgrepo-com.svg";
import "./App.css";
import Markdown from "react-markdown";
import { type IElement } from "./interfaces/elementsType";

function App() {
  const [elements, setElements] = useState<IElement[]>([]);

  const fetchElements = async () => {
    const URL = "http://localhost:3000/api/elements/";
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setElements(data);
    } catch (error) {
      console.error("Failed to fetch elements:", error);
    }
  };

  // ✅ Chama fetchElements assim que o componente montar
  useEffect(() => {
    fetchElements();
  }, []);

  return (
    <>
      <div className="grid grid-flow-col grid-rows-1 gap-4 h-dvh p-4 text-center">
        <div className="col-pan-1 border border-gray-300 h-full">
          <h2 className="text-xl font-bold ">Left Section</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Elements title="text" type="text" icon={TextIcon} value="texto" />
            <Elements
              title="profile views"
              type="profile view"
              icon={ProfileViewsIcon}
              value="texto"
            />
            <Elements
              title="social media"
              type="social media"
              icon={SocialMediaIcon}
              value="texto"
            />
            <Elements
              title="stats"
              type="stats"
              icon={StatsIcon}
              value="texto"
            />
            <Elements
              title="techs"
              type="techs"
              icon={TechsIcon}
              value="texto"
            />
          </div>
        </div>

        {/* Middle Section */}
        <div className="col-span-1 border border-gray-300 h-full">
          <h2 className="text-xl font-bold">Middle Section</h2>
          <div className="mt-4 p-4 text-left">
            <h1 className="mb-4">Preview the ReadMe</h1>
            <div className="space-y-2">
              {elements.map((element) => (
                <div key={element._id} className="border p-2 rounded">
                  <p className="font-semibold">{element.title}</p>
                  <p className="text-sm text-gray-600">{element.type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-1 border border-gray-300 h-full ">
          <h2 className="text-xl font-bold">Right Section</h2>


        </div>
      </div>
    </>
  );
}

export default App;