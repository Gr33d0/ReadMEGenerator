import { type IList } from "../interfaces/elementsType";
import { useRef, useEffect, useState } from "react";

interface PropwindowProps {
  selectedId: string | null;
  list: IList | null;
}

export default function Propwindow({ selectedId, list }: PropwindowProps) {
  const [localList, setLocalList] = useState<IList | null>(null);

  const dragElement = useRef<number | null>(0);
  const dragOverElement = useRef<number | null>(0);

  // Garante que o objecto tem um array elements com pelo menos um elemento (evita undefined)
  const ensureHasElement = (maybeList: IList | null): IList | null => {
    if (!maybeList) return null;
    const elements =
      Array.isArray(maybeList.elements) && maybeList.elements.length > 0
        ? maybeList.elements
        : [
            {
              _id: (maybeList as any)?._id ?? "local-0",
              tagHtml: "p",
              tagMarkDown: "![alt](src)",
              value: "",
              url: "",
            },
          ];
    return { ...maybeList, elements };
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
      // Opcional: se o backend devolver o objecto actualizado, podes sincronizar:
      // setLocalList(data);
    } catch (error) {
      console.error("Failed to update element:", error);
    }
  };

  // Handlers criam um novo objeto (imutabilidade) e chamam updateElementById com o novo objecto
  const handleAlignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAlign = e.target.value as IList["align"];
    const base = ensureHasElement(localList) ?? ({} as IList);
    const newList: IList = { ...base, align: newAlign };
    setLocalList(newList);
    updateElementById(newList);
    window.dispatchEvent(new CustomEvent("refreshShowElements"));
  };

  const handleTextChange = (newValue: string) => {
    const base = ensureHasElement(localList);
    if (!base) return;

    const updatedElements = [
      {
        ...base.elements[0],
        value: newValue,
      },
      // mantemos os restantes elementos intactos (se houver)
      ...(base.elements.length > 1 ? base.elements.slice(1) : []),
    ];

    const updatedList: IList = { ...base, elements: updatedElements };
    setLocalList(updatedList);
    updateElementById(updatedList);
    window.dispatchEvent(new CustomEvent("refreshShowElements"));
  };

  const handleTagChange = (newValue: string) => {
    const base = ensureHasElement(localList);
    if (!base) return;

    const updatedElements = [
      {
        ...base.elements[0],
        tagHtml: newValue,
        tagMarkDown: newValue, // se quiseres mapeamento distinto, altera aqui
      },
      ...(base.elements.length > 1 ? base.elements.slice(1) : []),
    ];

    const updatedList: IList = { ...base, elements: updatedElements };
    setLocalList(updatedList);
    updateElementById(updatedList);
    window.dispatchEvent(new CustomEvent("refreshShowElements"));
  };

  const handleHeightChange = (newValue: string) => {
    const base = ensureHasElement(localList) ?? ({} as IList);
    const updatedList: IList = {
      ...base,
      height: newValue,
    };
    setLocalList(updatedList);
    updateElementById(updatedList);
    window.dispatchEvent(new CustomEvent("refreshShowElements"));
  };

  const handleSpacingChange = (newValue: string) => {
    const base = ensureHasElement(localList) ?? ({} as IList);
    const updatedList: IList = {
      ...base,
      spacing: newValue,
    };
    setLocalList(updatedList);
    updateElementById(updatedList);
    window.dispatchEvent(new CustomEvent("refreshShowElements"));
  };

  const handleSort = () => {
    const elementClone = [...localList!.elements];
    const temp = elementClone[dragElement.current!];
    elementClone[dragElement.current!] = elementClone[dragOverElement.current!];
    elementClone[dragOverElement.current!] = temp;
    setLocalList({ ...localList!, elements: elementClone });
    updateElementById({ ...localList!, elements: elementClone });
    window.dispatchEvent(new CustomEvent("refreshShowElements"));
  };

  const handleRemoveElement = (index: number) => {
    if (!localList) return;
    const updatedElements = localList.elements.filter((_, i) => i !== index);
    const updatedList: IList = { ...localList, elements: updatedElements };
    setLocalList(updatedList);
    updateElementById(updatedList);
    window.dispatchEvent(new CustomEvent("refreshShowElements"));
  };

  // Sincroniza localList sempre que a lista prop (categoria) ou selectedId mudar
  useEffect(() => {
    if (!selectedId) {
      setLocalList(null);
      return;
    }
    // usamos ensureHasElement para garantir estrutura consistente no estado local
    setLocalList(ensureHasElement(list));
  }, [selectedId, list]);

  return (
    <div>
      <div style={{ marginBottom: 8, color: "#666" }}>{selectedId}</div>

      <h3>Layout</h3>
      <h4>Align</h4>
      <select
        value={localList?.align ?? ""}
        onChange={handleAlignChange}
        id="align"
        disabled={!localList}
      >
        <option value="">-- select --</option>
        <option value="right">right</option>
        <option value="center">center</option>
        <option value="left">left</option>
      </select>
      {localList?.name === "text" ?(
        <>
          <h3>Content</h3>
          <p>Text</p>
          <textarea
            className="resize-none"
            value={localList?.elements?.[0]?.value ?? ""}
            onChange={(e) => handleTextChange(e.target.value)}
            disabled={!localList}
          ></textarea>

          <h3>Tag</h3>
          <select
            value={localList?.elements?.[0]?.tagHtml ?? ""}
            onChange={(e) => handleTagChange(e.target.value)}
            disabled={!localList}
          >
            <option value="">-- select tag --</option>
            <option value="p">p</option>
            <option value="h1">h1</option>
            <option value="h2">h2</option>
            <option value="h3">h3</option>
            <option value="h4">h4</option>
            <option value="h5">h5</option>
            <option value="h6">h6</option>
          </select>
        </>
      ) : localList?.name === "techs" || localList?.name === "socials" ? (
        <>
          <h3>Height</h3>
          <textarea
            className="resize-none"
            value={localList?.height ?? ""}
            onChange={(e) => handleHeightChange(e.target.value)}
            disabled={!localList}
          ></textarea>

          <h3>Spacing</h3>
          <textarea
            className="resize-none"
            value={localList?.spacing ?? ""}
            onChange={(e) => handleSpacingChange(e.target.value)}
            disabled={!localList}
          ></textarea>

          <h3>{localList?.name}</h3>

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
                <div
                  className="col-span-1"
                  onClick={() => handleRemoveElement(index)}
                >
                  <span>E</span>
                </div>
              </div>
            );
          })}
        </>
      ):null}
    </div>
  );
}
