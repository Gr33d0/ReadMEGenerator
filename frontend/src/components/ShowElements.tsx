import { useEffect, useState } from "react";
import { type IList } from "../interfaces/elementsType";

export default function ShowElements() {
  const [lists, setLists] = useState<IList[]>([]);

  const fetchElements = async () => {
    const URL = "http://localhost:3000/api/elements/";
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
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
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
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
  }, []);

  return (
    <>
      <h2 className="text-xl font-bold">Middle Section</h2>
      <div className="mt-4 p-4 text-left preview-content">
        <h1 className="mb-4">Preview the ReadMe</h1>

        <div className="space-y-2">
          {lists.map((list) => {
            let htmlVariable = "";
            if (list.name === "Text")
              htmlVariable = `<${list.elements[0].tagHtml}>${list.elements[0].value}</${list.elements[0].tagHtml}>`;
            if (list.name === "Techs") {
              htmlVariable = list.elements
                .map(
                  (elem) =>
                    `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${elem.value}/${elem.value}-original.svg" alt="${elem.value}" width="26" height="26" />`
                )
                .join(" ");
            }
            if (list.name === "Socials") {
              htmlVariable = list.elements
                .map(
                  (elem) =>
                    `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${elem.value}/${elem.value}-original.svg" alt="${elem.value}" width="26" height="26" />`
                )
                .join(" ");
            }
            if (list.name === "Stats") {
              htmlVariable = list.elements
                .map((elem) => {
                  if (elem.value === "github stats") {
                    return `<img src="https://github-readme-stats.vercel.app/api?username=${list.user}&hide_title=false&hide_rank=false&show_icons=true&include_all_commits=true&count_private=true&disable_animations=false&theme=dracula&locale=en&hide_border=false&order=1" height="150" alt="stats graph"  />`;
                  }
                  if (elem.value === "languages") {
                    return `<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${list.user}&hide_title=false&hide_rank=false&show_icons=true&include_all_commits=true&count_private=true&disable_animations=false&theme=dracula&locale=en&hide_border=false&layout=compact" height="150" alt="languages graph"  />`;
                  }
                  if (elem.value === "streak") {
                    return `<img src="https://github-readme-streak-stats.herokuapp.com/?user=${list.user}&theme=dracula&hide_border=false" height="150" alt="streak graph"  />`;
                  }
                  if (elem.value === "trophy") {
                    return `<img src="https://github-profile-trophy.vercel.app/?username=${list.user}&theme=dracula&no-frame=false&no-bg=true&margin-w=4" height="150" alt="trophy graph"  />`;
                  }
                  if (elem.value === "activity") {
                    return `<img src="https://github-readme-activity-graph.vercel.app/graph?username=${list.user}&radius=16&theme=react&area=true&order=5" height="150" alt="activity graph"  />`;
                  }
                })
                .join(" ");
            }
            return (
              <div
                id={list._id!}
                key={list._id!}
                className="border p-2 rounded "
                onContextMenu={(e) => handleRightClick(e, list._id!)}
              >
                <div
                  className="flex flex-wrap gap-1 items-center"
                  dangerouslySetInnerHTML={{ __html: htmlVariable! }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
