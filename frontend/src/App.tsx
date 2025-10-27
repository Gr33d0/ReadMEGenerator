import { useEffect, useState } from "react";
import Elements from "./components/Elements";
import ElementStat from "./components/ElementStat";
import ElementsList from "./components/ElementsList";

import TextIcon from "./assets/text-svgrepo-com.svg";
import StatIcon from "./assets/stats-svgrepo-com.svg";
import TechIcon from "./assets/chip-component-svgrepo-com.svg"
import SocialIcon from "./assets/hashtag-square-svgrepo-com.svg"
import { type IElement } from "./interfaces/elementsType";
import "./App.css";


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

  useEffect(() => {
    fetchElements();
  }, []);

  const handleRightClick = async (id: string,e: React.MouseEvent) => {
    e.preventDefault();
    const URL = `http://localhost:3000/api/elements/${id}`;
    try {
      const response = await fetch(URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchElements()

      
    } catch (error) {
      console.error("Failed to fetch elements:", error);
    }
  };
  return (
    <>
      <div className="grid grid-flow-col grid-rows-1 gap-4 h-dvh p-4 text-center">
        <div className="col-pan-1 border border-gray-300 h-full">
          <h2 className="text-xl font-bold ">Left Section</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="row-pan-1 border border-gray-300 h-full w-percentage" onClick={fetchElements}>
              <Elements
                title="title"
                type="title"
                icon={TextIcon}
                value="titulo"
                html_value="h1"
                markdown_value="##"
              />
            </div>
            <div className="row-pan-1 border border-gray-300 h-full w-percentage" onClick={fetchElements}>
              <Elements
                title="text"
                type="text"
                icon={TextIcon}
                value="texto"
                html_value="p"
                markdown_value=""
              />
            </div>
            <div className="row-pan-1 border border-gray-300 h-full w-percentage" onClick={fetchElements}>
              <ElementStat
                title="stat"
                type="stat"
                icon={StatIcon}
                value="Gr33d0"
              />
            </div>
            <div className="row-pan-1 border border-gray-300 h-full w-percentage" onClick={fetchElements}>
              <ElementsList title="techList" type="list" icon={TechIcon} value={["javascript","jest"]}/>
            </div>
            <div className="row-pan-1 border border-gray-300 h-full w-percentage" onClick={fetchElements}>
              <ElementsList title="SocialList" type="list" icon={SocialIcon} value={["linkedin","facebook"]}/>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="col-span-1 border border-gray-300 h-full">
          <h2 className="text-xl font-bold">Middle Section</h2>
          <div className="mt-4 p-4 text-left preview-content">
            <h1 className="mb-4">Preview the ReadMe</h1>

            <div className="space-y-2">
              {elements.map((element) => (
                <div
                  id={element._id}
                  key={element._id}
                  className="border p-2 rounded"
                  dangerouslySetInnerHTML={{ __html: element.html_value }}
                  onContextMenu={(e) => handleRightClick(element._id,e)}
                />
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
