import { type IList } from "../interfaces/elementsType";
import { useEffect, useState } from "react";

interface PropwindowProps {
  selectedId: string | null;
  list: IList | null;
}

export default function Propwindow({ selectedId, list }: PropwindowProps) {
  const [localList, setLocalList] = useState<IList | null>(null); 




  // agora aceita um parâmetro com os dados a actualizar — evita usar estado obsoleto
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
      // opcional: setLocalList(data) se o servidor retorna o objecto actualizado
      // setLocalList(data);
    } catch (error) {
      console.error("Failed to update element:", error);
    }
  };

  const handleAlignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // cria novo objecto a partir do estado actual (pode ser null)
    const newAlign = e.target.value as IList["align"];
    const newList: IList = { ...(localList ?? ({} as IList)), align: newAlign };
    setLocalList(newList);
    // envia o objecto que acabámos de criar (não confiar no estado imediato)
    updateElementById(newList);
  };

  const handleTextChange = (newValue: string) => {
    if (!localList) return;

    // Cria novo objeto de list com apenas o valor alterado
    const updatedList: IList = {
      ...localList,
      elements: [
        {
          ...localList.elements[0],
          value: newValue,
        },
      ],
    };

    setLocalList(updatedList);
    updateElementById(updatedList); // Atualiza o backend
  };

  const handleTagChange = (newValue: string) => {
    if (!localList) return;

    // Cria novo objeto de list com apenas o valor alterado
    const updatedList: IList = {
      ...localList,
      elements: [
        {
          ...localList.elements[0],
          tagHtml: newValue,
          tagMarkDown: newValue,
        },
      ],
    };

    setLocalList(updatedList);
    updateElementById(updatedList); // Atualiza o backend
  };

  const handleHeightChange = (newValue: string) => {
    if (!localList) return;
    const updatedList: IList = {
      ...localList,
      height: newValue,
    };
    setLocalList(updatedList);
    updateElementById(updatedList);
  };
  const handleSpacingChange = (newValue: string) => {
    if (!localList) return;
    const updatedList: IList = {
      ...localList,
      spacing: newValue,
    };
    setLocalList(updatedList);
    updateElementById(updatedList);
  };

  useEffect(() => {
    if (!selectedId) {
      setLocalList(null);
      return;
    }
    setLocalList(list);
  }, [selectedId]);

  return (
    <div>
      {selectedId}
      <h3>Layout</h3>
      <h3>Align</h3>
      <select
        value={localList?.align ?? ""}
        onChange={handleAlignChange}
        id="align"
        disabled={!localList} // evita interacção antes de carregar
      >
        <option value="right">right</option>
        <option value="center">center</option>
        <option value="left">left</option>
      </select>
      <h3>Content</h3>
      <p>Text</p>
      <textarea
        className="resize-none"
        value={localList?.elements[0].value ?? ""}
        onChange={(e) => handleTextChange(e.target.value)}
      ></textarea>
      <h3>Tag</h3>
      <select
        value={localList?.elements[0].tagHtml ?? ""}
        onChange={(e) => handleTagChange(e.target.value)}
      >
        <option value="p">p</option>
        <option value="h1">h1</option>
        <option value="h2">h2</option>
        <option value="h3">h3</option>
        <option value="h4">h4</option>
        <option value="h5">h5</option>
        <option value="h6">h6</option>
      </select>
      {
        /* Additional properties for Techs, Socials, Stats could go here */
        localList?.name === "Techs" ||
        localList?.name === "Socials" ||
        localList?.name === "Stats" ? (
          <>
            <h3>Height</h3>
            <textarea
              className="resize-none"
              value={localList?.height ?? ""}
              onChange={(e) => handleHeightChange(e.target.value)}
            ></textarea>
            <h3>Spacing</h3>
            <textarea
              className="resize-none"
              value={localList?.spacing ?? ""}
              onChange={(e) => handleSpacingChange(e.target.value)}
            ></textarea>
            <h3>{localList?.name}</h3>
            {localList?.elements?.map((elements) => {
              return <div key={elements._id}>{elements.value}</div>;
            })}
          </>
        ) : null
      }
    </div>
  );
}
