import { type CreateElementDTO,type IElement} from "../interfaces/elementsType";


interface ElementsProps {
  title: string;  // Use primitive 'string' instead of 'String'
  type: string;
  icon: string;
  value: string;
  html_value: string;
  markdown_value: string;
}

export default function Elements({ title, type, icon,value,html_value,markdown_value }: ElementsProps) {
  const addElement = async (elementData: CreateElementDTO): Promise<IElement> => {
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
      await addElement({ title, type, icon,value,html_value,markdown_value });
   
      // Optional: Add success feedback here
    } catch (error) {
      console.error('Failed to add element:', error);
      // Optional: Add user-facing error handling here
      
    }
  };

  return (
    <div className="row-pan-1 border border-gray-300 h-full w-percentage" onClick={handleClick}>
      <img src={icon} width={26} height={26}  className="mx-auto my-4" />
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <p> {value}</p>
    </div>
  );
}
