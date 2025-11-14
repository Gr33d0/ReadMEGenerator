import { type IList } from "../interfaces/elementsType";
import { useRef, useEffect, useState } from "react";

interface StatLayoutProps {
  selectedId: string | null;
  list: IList | null;
}

export default function StatLayout({ selectedId, list }: StatLayoutProps) {
  const [localList, setLocalList] = useState<IList | null>(null);

  // Refs para drag-and-drop
  const dragStat = useRef<number | null>(null);
  const dragOverStat = useRef<number | null>(null);

  const statsOptions = ["languages", "streak", "throphy", "activity", "stats"];

  // Atualiza o backend
  const updateElementById = async (updatedList: IList | null) => {
    if (!selectedId) {
      console.warn("No selectedId — not updating");
      return;
    }
    if (!updatedList) {
      console.warn("No data to update");
      return;
    }

    console.log("Updating element (payload):", updatedList);

    const URL = `http://localhost:3000/api/elements/${selectedId}`;
    try {
      const response = await fetch(URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedList),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log("Element updated:", data);
      // opcional: sincronizar com a resposta do backend
      // setLocalList(data);
    } catch (error) {
      console.error("Failed to update element:", error);
    }
  };

  // Troca elementos no array
  const handleSort = () => {
    if (!localList) return; // Proteção contra null
    if (dragStat.current === null || dragOverStat.current === null) return;

    const statClone = [...localList.elements];
    const temp = statClone[dragStat.current];
    statClone[dragStat.current] = statClone[dragOverStat.current];
    statClone[dragOverStat.current] = temp;

    setLocalList({ ...localList, elements: statClone });
    updateElementById({ ...localList, elements: statClone });
  };

  // Sincroniza localList com props
  useEffect(() => {
    setLocalList(list);
  }, [list, selectedId]);

  // Renderização segura
  if (!localList) {
    return <div>Loading...</div>; // ou mensagem vazia
  }

  return (
    <div>
      {statsOptions.map((stat, index) => (
        <div
          key={`${stat}-${index}`}
          className="grid grid-cols-3 gap-4 relative flex space-x-3 border rounded p-2 cursor-grab hover:bg-gray-100"
          draggable
          onDragStart={() => (dragStat.current = index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            dragOverStat.current = index;
            handleSort();
          }}
        >
          <div className="col-span-2">
            <p id={`icon${index}`}>{stat}</p>
          </div>
          <div className="col-span-1">
            <span>S</span>
          </div>
        </div>
      ))}
    </div>
  );
}
