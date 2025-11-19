import AddWindow from "./AddWindow";
import Propwindow from "./Propwindow";

import { type IList } from "../interfaces/elementsType";
import { useEffect, useState } from "react";
import StatLayout from "./StatLayout";

interface RightSideProps {
  selectedId: string | null;
}

export default function RightSide({ selectedId }: RightSideProps) {
  const [activeTab, setActiveTab] = useState<string>("edit");
  const [list, setList] = useState<IList | null>(null);

  const fetchElementById = async () => {
    if (!selectedId) return;
    const URL = `http://localhost:3000/api/elements/${selectedId}`;
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setList(data);
    } catch (error) {
      console.error("Failed to fetch elements:", error);
    }
  };

  useEffect(() => {
    if (!selectedId) {
      setList(null);
      return;
    }
    fetchElementById();
  }, [selectedId]);

  if (
    list?.name === "techs" ||
    list?.name === "socials" ||
    list?.name === "text"
  ) {
    return (
      <>
        <div className="grid grid-cols-2 gap-4">
          {list?.name === "techs" || list?.name === "socials" ? (
            <div
              className={activeTab === "icons" ? "font-bold" : ""}
              onClick={() => setActiveTab("icons")}
            >
              Icons
            </div>
          ) : null}

          <div
            className={activeTab === "edit" ? "font-bold" : ""}
            onClick={() => setActiveTab("edit")}
          >
            Edit
          </div>
        </div>
        {activeTab === "icons" ? (
          <AddWindow selectedId={selectedId} list={list} />
        ) : (
          <Propwindow selectedId={selectedId} list={list} />
        )}
      </>
    );
  } else {
    return (
      <>
        <div className="grid grid-cols-1 gap-4">
          <div
            className="icons font-bold" 
          
          >
            Layout
          </div>

              <StatLayout selectedId={selectedId} list={list} />
              

         
        </div>
      </>
    );
  }
}
