import { type IList } from "../interfaces/elementsType";
import { useRef, useEffect, useState } from "react";

interface StatLayoutProps {
  selectedId: string | null;
  list: IList | null;
}

export default function StatLayout({ selectedId, list }: StatLayoutProps) {
  const [localList, setLocalList] = useState<IList | null>(null);


  // Refs para drag-and-drop
  const dragElement = useRef<number | null>(0);
  const dragOverElement = useRef<number | null>(0);

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
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log("Element updated:", data);
      // opcional: sincronizar com a resposta do backend
      // setLocalList(data);
    } catch (error) {
      console.error("Failed to update element:", error);
    }
  };

 const handleHideElement = (index: number) => {
  if (!localList) return;

  const updatedElements = localList.elements.map((el, i) => {
    const currentShow = !!el.show; // garante boolean primitivo (true/false)
    return i === index ? { ...el, show: !currentShow } : el;
  });

  const updatedList: IList = { ...localList, elements: updatedElements };

  setLocalList(updatedList);
  updateElementById(updatedList);
};

  // Troca elementos no array
  const handleSort = () => {
    const elementClone = [...localList!.elements];
    const temp = elementClone[dragElement.current!];
    elementClone[dragElement.current!] = elementClone[dragOverElement.current!];
    elementClone[dragOverElement.current!] = temp;
    setLocalList({ ...localList!, elements: elementClone });
    updateElementById({ ...localList!, elements: elementClone });
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
      {localList?.elements?.map((element, index) => {
        return (
          <div
            key={element._id ?? element.value}
            className=" grid grid-cols-3 gap-4 relative flex space-x-3 border rounded p-2"
            draggable
            onDragStart={() => (dragElement.current = index)}
            onDragEnter={() => (dragOverElement.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="col-span-2 ">
              <p id={`icon${index}`}>{element.value}</p>
            </div>
            <div className="col-span-1">
              {element.show ?  (<span onClick={()=>handleHideElement(index)}>Hide</span>):(<span onClick={()=>handleHideElement(index)}>Show</span>)}

            </div>
          </div>
        );
      })}
    </div>
  );
}
