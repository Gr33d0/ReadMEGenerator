import { useEffect, useState } from "react";
import { type IList } from "../interfaces/elementsType";

export default function ReadMeView() {
  const [lists, setLists] = useState<IList[]>([]);

  const fetchElements = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/elements/");
      const data = await response.json();
      setLists(data);
      console.log(data);
    } catch (e) {
      console.error("Error fetching lists", e);
    }
  };

  useEffect(() => {
    fetchElements();
    const handler = () => fetchElements();
    window.addEventListener("refreshShowElements", handler);
    return () => window.removeEventListener("refreshShowElements", handler);
  }, []);

  return (
    <div>
      {lists.map((list) => {
        if (list.name === "text") {
          return `<${list.elements[0].tagHtml} style="text-align:${list.align}">${list.elements[0].value}</${list.elements[0].tagHtml}>`;
        }
        if (list.name === "techs" || list.name === "socials") {
          const elems = list.elements;
          elems.map((elem) => {
            return `<img src="${elem.url}" alt="${elem.value}" width="${list.height}" height="${list.height}" style="display:inline-block;" />`;
          });
        } else {
          const elems = list.elements;
          elems.map((elem) => {
            const v = elem.value;
            if (!v) return "";
            const user = encodeURIComponent(list.user || "");
            if (elem.show == true) {
              switch (v) {
                case "stats":
                  return `<img src="https://github-readme-stats.vercel.app/api?username=${user}&hide_title=false&show_icons=true&count_private=true&theme=dracula" height="150" alt="github stats" />`;
                case "languages":
                  return `<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=compact&theme=dracula" height="150" alt="top languages" />`;
                case "streak":
                  return `<img src="https://github-readme-streak-stats.herokuapp.com/?user=${user}&theme=dracula" height="150" alt="streak" />`;
                case "throphy":
                  return `<img src="https://github-profile-trophy.vercel.app/?username=${user}&theme=dracula&no-bg=true" height="150" alt="trophy" />`;
                case "activity":
                  return `<img src="https://github-readme-activity-graph.vercel.app/graph?username=${user}&theme=react&area=true" height="150" alt="activity graph" />`;
                default:
                  return "";
              }
            }
          });
        }
      })}
    </div>
  );
}
