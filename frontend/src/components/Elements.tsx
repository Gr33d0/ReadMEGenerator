interface ElementsProps {
    title?: string;
    symbol?: string | "https://via.placeholder.com/150";
    value?: string;
    onclick?: () => void;
}



export default function Elements({ title, symbol, onclick }: ElementsProps) {

  return (
    <div className="row-pan-1 border border-gray-300 h-full w-percentage" onClick={onclick}>
      <img src={symbol} width={26} height={26}  className="mx-auto my-4" />
      <h2 className="text-xl font-bold mb-4">{title}</h2>
    </div>
  );
}
