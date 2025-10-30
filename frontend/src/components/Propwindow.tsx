import { type IElement } from "../interfaces/elementsType";
import { useEffect, useState } from "react";

interface PropwindowProps {
  id: string;
}

export default function Propwindow({ id }: PropwindowProps) {
  const [element, setElement] = useState<IElement | null>(null);

  const fetchElementById = async () => {
    const URL = `http://localhost:3000/api/elements/${id}`;
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setElement(data);
    } catch (error) {
      console.error("Failed to fetch elements:", error);
    }
  };

  useEffect(() => {
    fetchElementById();
  }, [id]);

  const updateElementById = async (updatedProps: Object) => {
    const URL = `http://localhost:3000/api/elements/${id}`;
    try {
      const response = await fetch(URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...element,
          props: updatedProps
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setElement(data);
    } catch (error) {
      console.error("Failed to update element:", error);
    }
  };

  const handleAlignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAlign = e.target.value;
    const updatedProps = {
      ...element?.props,
      align: newAlign
    };
    updateElementById(updatedProps);
  };

  const getSelectedTag = () => {
    if (!element?.type) return "";
    
    const tags = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];
    return tags.find(tag => element.type.includes(tag)) || "";
  };

  const getAlign = () => {
    if (!element?.props || typeof element.props !== 'object') return "";
    const props = element.props as { align?: string };
    return props.align || "";
  };

  return (
    <div>
      {id}
      <h3>Layout</h3>
      <h3>Align</h3>
      <select value={getAlign()} onChange={handleAlignChange}>
        <option value="right">right</option>
        <option value="center">center</option>
        <option value="left">left</option>
      </select>
      <h3>Content</h3>
      <p>Text</p>
      <textarea className="resize-none"></textarea>
      <h3>Tag</h3>
      <select value={getSelectedTag()}>
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