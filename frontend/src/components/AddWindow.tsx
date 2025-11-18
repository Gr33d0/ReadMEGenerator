import { type IList } from "../interfaces/elementsType";
import { type IIcon } from "../interfaces/iconsType";

import { useEffect, useState } from "react";


interface AddWindowProps {
  selectedId: string | null;
  list: IList | null;
}

export default function AddWindow({ selectedId, list }: AddWindowProps) {
  const [localList, setLocalList] = useState<IList | null>(null);
  const [icons, setIcons] = useState<IIcon[] | null>(null);



  // agora recebe category como argumento para evitar problemas com closures
  const fetchIconsByCategory = async (category?: string) => {
    if (!category) {
      setIcons(null);
      return;
    }
    const URL = `http://localhost:3000/api/icons/category/${category}`;
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log("Fetched icons:", data);
      console.log("Category:", category);
      setIcons(data);
    } catch (error) {
      console.error("Failed to fetch icons:", error);
      setIcons(null);
    }
  };

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
      // Se o servidor devolver o objecto actualizado, podes setLocalList(data) aqui
    } catch (error) {
      console.error("Failed to update element:", error);
    }
  };

  const handleClick = (iconName: string) => {
    if (!localList || !icons) return;
    const selectedIcon = icons.find((icon) => icon.name === iconName);
    if (!selectedIcon) return;

    // criar novo objeto imutável em vez de mutar localList
    const newElement = {
      tagHtml: "img",
      tagMarkDown: "![alt](src)",
      value: selectedIcon.name,
      url: selectedIcon.url,
    };

    const newList: IList = {
      ...localList,
      elements: [...(localList.elements ?? []), newElement],
    };

    // atualiza estado local e envia ao servidor
    setLocalList(newList);
    updateElementById(newList);
    window.dispatchEvent(new CustomEvent("refreshShowElements"));
  };

  // agora dependemos tanto de selectedId quanto da categoria (list?.name)
  useEffect(() => {
    if (!selectedId) {
      setLocalList(null);
      setIcons(null);
      return;
    }

    // sincroniza localList com a prop (se mudou)
    setLocalList(list ?? null);

    // busca ícones para a categoria actual (ou limpa se não houver)
    fetchIconsByCategory(list?.name);
  }, [selectedId, list?.name]);

  return (
    <>
      <h3>Search bar</h3>
      <div>Icons {list?.name}</div>
      <div className="grid grid-cols-3 gap-4 justify-items-center overflow-y-auto">
        {icons?.map((icon) => (
          <div key={icon.name} onClick={() => handleClick(icon.name)}>
            <img id={icon.name} src={icon.url} alt={icon.name} width={50} height={50} />
          </div>
        ))}
      </div>
    </>
  );
}
