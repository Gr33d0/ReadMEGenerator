import {
  type CreateElementDTO,
  type IElement,
} from "../interfaces/elementsType.ts";

interface ElementsProps {
  title: string;
  type: string;
  icon: string;
  value: Array<string>;
}

export default function ElementsList({
  title,
  type,
  icon,
  value,
}: ElementsProps) {
  const techIconMap: Record<string, string> = {
    javascript: "javascript-original.svg",
    typescript: "typescript-original.svg",
    jest: "jest-plain.svg",
    react: "react-original.svg",
    nodejs: "nodejs-original.svg",
    python: "python-original.svg",
  };
const socialIconMap: Record<string, string> = {
    linkedin: "linkedin-original.svg",
    facebook: "facebook-original.svg",
    twitter: "twitter-original.svg",
  };

  const addElement = async (
    elementData: CreateElementDTO
  ): Promise<IElement> => {
    // Gera o HTML com todas as imagens do array value
    const iconMap = elementData.title === "techList"? techIconMap:socialIconMap
    
    const imagesHtml = value
      .map((lang) => {
        const imgPath = iconMap[lang] || "javascript-original.svg";
        const langName = iconMap[lang] ? lang : "javascript";
        return `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${langName}/${imgPath}" height="40"width="40" alt="${langName} logo" /><img width="12" /> `;
      })
      .join(" ");

    

    elementData.html_value = `<div style="display:flex;align-items:center;gap:8px;">${imagesHtml}</div>`;
    elementData.markdown_value = elementData.html_value;

    const URL = "http://localhost:3000/api/elements/";
    console.log("Element data:", elementData);

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(elementData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  };

  const handleClick = async () => {
    try {
      await addElement({
        title,
        type,
        icon,
        value: value.join(", "), // Converte array para string
        html_value: "",
        markdown_value: "",
        props: {}
      });
    } catch (error) {
      console.error("Failed to add element:", error);
      // Optional: Add user-facing error handling here
    }}

    return (
      <div onClick={handleClick}>
      <img
        src={icon}
        width={26}
        height={26}
        className="mx-auto my-4"
        alt={title}
      />
      <h2 className="text-xl font-bold mb-4">{title}</h2>
    </div>
    );
  };

