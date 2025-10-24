import { type IElement, type CreateElementDTO } from "../interfaces/elementsType.ts";

interface ElementsProps {
  title: string;  // Use primitive 'string' instead of 'String'
  type: string;
  icon: string;
  value: string;
}

export default function ElementsImg({ title, type, icon,value }: ElementsProps) {
  
  const addElement = async (elementData: CreateElementDTO): Promise<IElement> => {
    elementData.html_value = `
<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${elementData.value}&hide_title=false&hide_rank=false&show_icons=true&include_all_commits=true&count_private=true&disable_animations=false&theme=dracula&locale=en&hide_border=false&order=1" height="150" alt="stats graph"  />
  <img src="https://github-readme-stats.vercel.app/api/top-langs?username=${elementData.value}&locale=en&hide_title=false&layout=compact&card_width=320&langs_count=5&theme=dracula&hide_border=false&order=2" height="150" alt="languages graph"  />
</div>`;
    elementData.markdown_value = elementData.html_value;
    const URL = "http://localhost:3000/api/elements/";
       console.log(elementData)
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(elementData)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  const handleClick = async () => {
    try {
      await addElement({ title, type, icon,value,html_value: "",markdown_value: "" });
   
      // Optional: Add success feedback here
    } catch (error) {
      console.error('Failed to add element:', error);
      // Optional: Add user-facing error handling here
      
    }
  };

  return (
    <div
      
      onClick={handleClick}
    >
      <img src={icon} width={26} height={26} className="mx-auto my-4" alt={title} />
      <h2 className="text-xl font-bold mb-4">{title}</h2>

    </div>
  );
}