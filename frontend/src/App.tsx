import { useEffect, useState } from "react";
import Elements from "./components/Elements";
import TextIcon from "./assets/text-svgrepo-com.svg";
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
  return (
    <>
      <div className="grid grid-flow-col grid-rows-1 gap-4 h-dvh p-4 text-center">
        <div className="col-pan-1 border border-gray-300 h-full">
          <h2 className="text-xl font-bold ">Left Section</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Elements
              title="title"
              type="title"
              icon={TextIcon}
              value="titulo"
              html_value="h1"
              markdown_value="##"
            />
            <Elements
              title="text"
              type="text"
              icon={TextIcon}
              value="texto"
              html_value="p"
              markdown_value=""
            />
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
                  key={element._id}
                  className="border p-2 rounded"
                  dangerouslySetInnerHTML={{ __html: element.html_value }}
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
