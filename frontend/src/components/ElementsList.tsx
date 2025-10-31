import {
  type IList,
  type IElement,
} from "../interfaces/elementsType.ts";

interface ElementsProps {
  name: string;
  elements: IElement[];
  user?: string;
  icon: string;

}

export default function ElementsList({

  name,
  elements,
  icon,
}: ElementsProps) {
/*const techIconMap: Record<string, string> = {
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
  };*/

  const handleClick = async () => {
    const newList: IList = {
      name,
      elements,
    };

    try {
      const response = await fetch("http://localhost:3000/api/elements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newList),
      });

      if (!response.ok) {
        throw new Error(`Erro ao adicionar lista: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Lista adicionada com sucesso:", data);
      alert("Lista adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar lista:", error);
      alert("Erro ao adicionar lista!");
    }
  };

    return (
      <div onClick={handleClick}>
      <img
        src={icon}
        width={26}
        height={26}
        className="mx-auto my-4"
        alt={"list of icons"}
      />
      <h2 className="text-xl font-bold mb-4">{name}</h2>
    </div>
    );
  };

