import { type IList } from "../interfaces/elementsType";
import { useEffect, useState } from "react";

interface PropwindowProps {
  selectedId: string | null;
}

export default function Propwindow({ selectedId }: PropwindowProps) {
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
      // opcional: setList(data) se o servidor retorna o objecto actualizado
      // setList(data);
    } catch (error) {
      console.error("Failed to update element:", error);
    }
  };

  const handleAlignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // cria novo objecto a partir do estado actual (pode ser null)
    const newAlign = e.target.value as IList["align"];
    const newList: IList = { ...(list ?? ({} as IList)), align: newAlign };
    setList(newList);
    // envia o objecto que acabámos de criar (não confiar no estado imediato)
    updateElementById(newList);
  };

  const handleTextChange = (newValue: string) => {
    if (!list) return;

    // Cria novo objeto de list com apenas o valor alterado
    const updatedList: IList = {
      ...list,
      elements: [
        {
          ...list.elements[0],
          value: newValue,
        },
      ],
    };

    setList(updatedList);
    updateElementById(updatedList); // Atualiza o backend
  };

  const handleTagChange = (newValue: string) => {
    if (!list) return;

    // Cria novo objeto de list com apenas o valor alterado
    const updatedList: IList = {
      ...list,
      elements: [
        {
          ...list.elements[0],
          tagHtml: newValue,
          tagMarkDown: newValue,
        },
      ],
    };

    setList(updatedList);
    updateElementById(updatedList); // Atualiza o backend
  };

  useEffect(() => {
    if (!selectedId) {
      setList(null);
      return;
    }
    fetchElementById();
  }, [selectedId]);

  return (
    <div>
      {selectedId}
      <h3>Layout</h3>
      <h3>Align</h3>
      <select
        value={list?.align ?? ""}
        onChange={handleAlignChange}
        id="align"
        disabled={!list} // evita interacção antes de carregar
      >
        <option value="right">right</option>
        <option value="center">center</option>
        <option value="left">left</option>
      </select>
      <h3>Content</h3>
      <p>Text</p>
      <textarea
        className="resize-none"
        value={list?.elements[0].value ?? ""}
        onChange={(e) => handleTextChange(e.target.value)}
      ></textarea>
      <h3>Tag</h3>
      <select value={list?.elements[0].tagHtml ?? ""} onChange={(e)=>handleTagChange(e.target.value)}>
        <option value="p">p</option>
        <option value="h1">h1</option>
        <option value="h2">h2</option>
        <option value="h3">h3</option>
        <option value="h4">h4</option>
        <option value="h5">h5</option>
        <option value="h6">h6</option>
      </select>
    </div>
  );
}
