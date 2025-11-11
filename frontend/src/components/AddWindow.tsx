import { type IElement, type IList } from "../interfaces/elementsType";
import {type IIcon} from "../interfaces/iconsType";
import { useEffect, useState } from "react";

interface AddWindowProps {
  selectedId: string | null;
  list: IList | null;
}

export default function AddWindow({ selectedId , list}: AddWindowProps) {
  const [localList, setLocalList] = useState<IList | null>(null);
  const [icons, setIcons] = useState<IIcon[]| null>(null);



  const fetchIcons = async () => {
    const URL = `http://localhost:3000/api/icons`;
    try {
        const response = await fetch(URL, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
        if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        console.log("Fetched icons:", data);
        setIcons(data);
    } catch (error) {
      console.error("Failed to fetch icons:", error);
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
const handleClick = (iconName: string) => {

    if (!localList || !icons) return;
    const selectedIcon = icons.find((icon) => icon.name === iconName);
    if (!selectedIcon) return;
    // Cria novo objeto de list com apenas o valor alterado
    localList.elements.push({
        tagHtml: "img",
        tagMarkDown: "![alt](src)",
        value: selectedIcon.name,
        url: selectedIcon.url,
    });

    

    updateElementById(localList);
  };





  useEffect(() => {
    if (!selectedId) {
      setLocalList(null);
      return;
    }
    setLocalList(list);

    fetchIcons();
  }, [selectedId]);

  return (
    <>
    <h3>Search bar</h3>
    <div>Icons</div>
    <div className="grid grid-cols-3 gap-4 justify-items-center overflow-y-auto">
    {
        icons?.map((icon) => (
          
            <div key={icon.name} onClick={() =>handleClick(icon.name)} >
                <img id={icon.name} src={icon.url} alt={icon.name} width={50} height={50}  />
            </div>
        ))
    }
    </div>

    </>
     
  );
}
