import Elements from "./components/Elements";
import TextIcon from "./assets/text-svgrepo-com.svg"
import ProfileViewsIcon from "./assets/telescope-svgrepo-com.svg"
import SocialMediaIcon from "./assets/hashtag-square-svgrepo-com.svg"
import StatsIcon from "./assets/stats-svgrepo-com.svg"
import TechsIcon from "./assets/chip-component-svgrepo-com.svg"
import "./App.css";
import Markdown from 'react-markdown'




function App() {
  const markdown = '# Sample ReadMe';
    
    
  
  return (
    <>
      <div className="grid grid-flow-col grid-rows-1 gap-4 h-dvh p-4 text-center">
        <div className="col-pan-1 border border-gray-300 h-full">
          <h2 className="text-xl font-bold ">Left Section</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Elements title="Text" symbol={TextIcon}  />
            <Elements title="Profile views" symbol={ProfileViewsIcon} />
            <Elements title="Social Media" symbol={SocialMediaIcon} />
            <Elements title="Stats" symbol={StatsIcon}  />
            <Elements title="Techs" symbol={TechsIcon}  />
          </div>
        </div>
        <div className="col-pan-1 border border-gray-300 h-full">
          <h2 className="text-xl font-bold ">Middle Section</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <h1>Preview the ReadMe</h1>
            <Markdown>{markdown}</Markdown>
          </div>
        </div>
        <div className="col-pan-1 border border-gray-300 h-full">
          <h2 className="text-xl font-bold ">Right Section</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            Settings
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
