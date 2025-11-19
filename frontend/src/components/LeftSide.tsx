import ElementsList from "./ElementsList";
import TextIcon from "../assets/text-svgrepo-com.svg";
import StatIcon from "../assets/stats-svgrepo-com.svg";
import TechIcon from "../assets/chip-component-svgrepo-com.svg";
import SocialIcon from "../assets/hashtag-square-svgrepo-com.svg";

export default function LeftSide() {
  return (
    <>
      <h2 className="text-xl font-bold ">Left Section</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="row-pan-1 border border-gray-300 h-full w-percentage">
          <ElementsList
            name="text"
            elements={[{ tagHtml: "h1", tagMarkDown: "##", value: "titulo" }]}
            icon={TextIcon}
          />
        </div>
        <div className="row-pan-1 border border-gray-300 h-full w-percentage">
          <ElementsList
            name="techs"
            elements={[
              {
                tagHtml: "img",
                tagMarkDown: "![alt](src)",
                value: "javascript",
                url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
              },
              {
                tagHtml: "img",
                tagMarkDown: "![alt](src)",
                value: "typescript",
                url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
              },
            ]}
            icon={TechIcon}
          />
        </div>
        <div className="row-pan-1 border border-gray-300 h-full w-percentage">
          <ElementsList
            name="socials"
            elements={[
              {
                tagHtml: "img",
                tagMarkDown: "![alt](src)",
                value: "linkedin",
                url:"https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/linkedin/default.svg"
              },
              {
                tagHtml: "img",
                tagMarkDown: "![alt](src)",
                value: "twitter",
                url: "https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/twitter/default.svg"
                
              },
            ]}
            icon={SocialIcon}
          />
        </div>
        <div className="row-pan-1 border border-gray-300 h-full w-percentage">
          <ElementsList
            name="stats"
            elements={[
              {
                tagHtml: "img",
                tagMarkDown: "![alt](src)",
                value: "languages",
                show: true,
              },
              {
                tagHtml: "img",
                tagMarkDown: "![alt](src)",
                value: "streak",
                show: true,
              },
              {
                tagHtml: "img",
                tagMarkDown: "![alt](src)",
                value: "activity",
                show: true,
              },
              {
                tagHtml: "img",
                tagMarkDown: "![alt](src)",
                value: "stats",
                show: false,
              },
            ]}
            icon={StatIcon}
          />
        </div>
      </div>
    </>
  );
}
