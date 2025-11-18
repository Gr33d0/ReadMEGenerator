import React, { useEffect, useState } from "react";
import { type IList } from "../interfaces/elementsType";


export interface ShowElementsHandle {
  refresh: () => void;
}

interface ShowElementsProps {
  setSelectedId: (id: string) => void;
  
}

export default function ShowElements({ setSelectedId }: ShowElementsProps) {
  const [lists, setLists] = useState<IList[]>([]);

  const fetchElements = async () => {
    const URL = "http://localhost:3000/api/elements/";
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setLists(data);
    } catch (error) {
      console.error("Failed to fetch elements:", error);
    }
  };

  const deleteElement = async (id: string) => {
    const URL = `http://localhost:3000/api/elements/${id}`;
    try {
      const response = await fetch(URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      setLists((prevLists) => prevLists.filter((list) => list._id !== id));
    } catch (error) {
      console.error("Failed to delete element:", error);
    }
  };

  const handleRightClick = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    deleteElement(id);
  };

  useEffect(() => {
    fetchElements();
     const handleRefresh = () => fetchElements();
    window.addEventListener("refreshShowElements", handleRefresh);

    return () => {
      window.removeEventListener("refreshShowElements", handleRefresh);
    };
  }, []);

  return (
    <>
      <h2 className="text-xl font-bold">Middle Section</h2>
      <div className="mt-4 p-4 text-left preview-content">
        <h1 className="mb-4">Preview the ReadMe</h1>

        <div className="space-y-2">
          {lists.map((list) => {
            let htmlVariable = "";
            let styleVariable: React.CSSProperties = {};
            const height = list.height ?? "24"; // fallback
            const gap = parseInt(list.spacing || "0", 10) || 0;

            if (list.name === "text" && list.elements[0]) {
              const tag = list.elements[0].tagHtml || "p";
              const align = list.align || "left";
              const value = list.elements[0].value || "";
              htmlVariable = `<${tag} style="text-align:${align}">${value}</${tag}>`;
            }

            if (list.name === "techs" || list.name === "socials") {
              htmlVariable = list.elements
                .map((elem) => {
                  const v = elem.value;
                  if (!v) return "";
                  const src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${v}/${v}-original.svg`;
                  return `<img src="${src}" alt="${v}" width="${height}" height="${height}" style="display:inline-block;" />`;
                })
                .join(" ");
              styleVariable = {
                display: "flex",
                flexWrap: "wrap",
                justifyContent: (list.align as React.CSSProperties["justifyContent"]) || "flex-start",
                gap: gap,
                alignItems: "center",
              };
            }

            if (list.name === "stats") {
              // construir corretamente as tags retornando string para cada elemento
              htmlVariable = list.elements
                .map((elem) => {
                  const v = elem.value;
                  if (!v) return "";
                  const user = encodeURIComponent(list.user || "");
                  if (elem.show == true){
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
                  else null
                  
                })
                .join(" ");
              styleVariable = {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: gap || 8,
                justifyContent: (list.align as React.CSSProperties["justifyContent"]) || "flex-start",
                alignItems: "center",
              };
            }

            return (
              <div
                id={list._id!}
                key={list._id!}
                className="border p-2 rounded"
                onContextMenu={(e) => handleRightClick(e, list._id!)}
                onClick={() => setSelectedId(list._id!)}
              >
                <div dangerouslySetInnerHTML={{ __html: htmlVariable }} style={styleVariable} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
