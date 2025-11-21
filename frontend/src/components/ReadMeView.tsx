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

  // ---- Gerar STRING final ----
  const htmlString = lists
    .map((list) => {
      if (list.name === "text") {
        return `<${list.elements[0].tagHtml} style="text-align:${list.align}">${list.elements[0].value}</${list.elements[0].tagHtml}>`;
      }

      if (list.name === "techs" || list.name === "socials") {
        const tagInicial = `<div align="${list.align}">`;
        const tagFinal = `</div>`;

        // array de strings com cada img formatada
        const imgs = list.elements.map(
          (elem) =>
            ` <img src="${elem.url}" alt="${elem.value}" width="${list.height}" height="${list.height}" />`
        );

        // junta tudo com quebras de linha
        const content = [tagInicial, ...imgs, tagFinal].join("\n");

        return content; // devolve TUDO com enter
      }
      else{
        const tagInicial = `<div align="${list.align}">`;
        const tagFinal = `</div>`;
        const stats = list.elements
        .map((elem) => {
          if (!elem.show) return "";
          const user = encodeURIComponent(list.user || "");
          switch (elem.value) {
            case "stats":
              return `  <img src="https://github-readme-stats.vercel.app/api?username=${user}&theme=dracula"/>`;
            case "languages":
              return `  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=compact&theme=dracula"/>`;
            case "streak":
              return `  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${user}&theme=dracula"/>`;
            case "throphy":
              return `  <img src="https://github-profile-trophy.vercel.app/?username=${user}&theme=dracula&no-bg=true"/>`;
            case "activity":
              return `  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${user}&theme=react&area=true"/>`;
            default:
              return "";
          }
        });
        const content = [tagInicial, ...stats, tagFinal].join("\n");
        return content
      }

    })
    .join("\n"); // ENTER entre cada list

  return (
    <pre style={{ whiteSpace: "pre-wrap", fontSize: "10px" }}>{htmlString}</pre>
  );
}
