import { useState } from "react";

import RightSide from "./components/RightSide";
import ShowElements from "./components/ShowElements";
import LeftSide from "./components/LeftSide";
import ReadMeView from "./components/ReadMeView";
import "./App.css";

function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // controla qual dos dois componentes aparece
  const [showReadme, setShowReadme] = useState(false);

  return (
    <div className="min-h-screen w-full">
      <div className="grid grid-cols-7 min-h-screen">
        {/* Left Side */}
        <div className="col-span-2 border border-gray-300 h-full">
          <LeftSide />
        </div>

        {/* Middle Section */}
        <div className="col-span-3 border border-gray-300 h-full p-4">

          {/* Botão de troca */}
          <button
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setShowReadme((prev) => !prev)}
          >
            {showReadme ? "Mostrar Preview" : "Mostrar ReadMe"}
          </button>

          {/* Render condicional */}
          {showReadme ? (
            <ReadMeView />
          ) : (
            <ShowElements setSelectedId={setSelectedId} />
          )}
        </div>

        {/* Right Section */}
        <div className="col-span-2 border border-gray-300 h-full">
          <h2 className="text-xl font-bold">Right Section</h2>
          <RightSide selectedId={selectedId} />
        </div>
      </div>
    </div>
  );
}

export default App;
