

import ElementsList from "./components/ElementsList";
import Propwindow from "./components/Propwindow";
import TextIcon from "./assets/text-svgrepo-com.svg";
import StatIcon from "./assets/stats-svgrepo-com.svg";
import TechIcon from "./assets/chip-component-svgrepo-com.svg"
import SocialIcon from "./assets/hashtag-square-svgrepo-com.svg"
import ShowElements from "./components/ShowElements";

import {useState} from "react";


import "./App.css";




function App() {

  const [selectedId, setSelectedId] = useState<string | null>(null);



  return (
    <>
      <div className="grid grid-flow-col grid-rows-1 gap-4 h-dvh p-4 text-center">
        <div className="col-pan-1 border border-gray-300 h-full">
          <h2 className="text-xl font-bold ">Left Section</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="row-pan-1 border border-gray-300 h-full w-percentage" >
               <ElementsList
                name="Text"
                elements={[{ tagHtml: "h1", tagMarkDown: "##", value: "Titulo" }]}
                icon={TextIcon}
              />
            </div>
            <div className="row-pan-1 border border-gray-300 h-full w-percentage" >
              <ElementsList
                name="Techs"
                elements={[{ tagHtml: "img", tagMarkDown: "![alt](src)", value: "javascript" },{ tagHtml: "img", tagMarkDown: "![alt](src)", value: "typescript" }]}
                icon={TechIcon}
              />
            </div>
            <div className="row-pan-1 border border-gray-300 h-full w-percentage" >
              <ElementsList
                name="Socials"
                elements={[{ tagHtml: "img", tagMarkDown: "![alt](src)", value: "linkedin" },{ tagHtml: "img", tagMarkDown: "![alt](src)", value: "twitter" }]}
                icon={SocialIcon}
              />
            </div>
            <div className="row-pan-1 border border-gray-300 h-full w-percentage">
              <ElementsList
                name="Stats"
                elements={[{ tagHtml: "img", tagMarkDown: "![alt](src)", value: "activity" }]}
                icon={StatIcon}
              />
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="col-span-2 border border-gray-300 h-full">
          <ShowElements setSelectedId={setSelectedId} />
        </div>

        {/* Right Section */}
        <div className="col-span-1 border border-gray-300 h-full ">
          <h2 className="text-xl font-bold">Right Section</h2>
          <Propwindow selectedId={selectedId} />
        </div>
      </div>
    </>
  );
}

export default App;
