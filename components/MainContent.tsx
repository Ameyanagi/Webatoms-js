import { useState } from 'react';
import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';

export default function MainContent() {
  const [outputText, setOutputText] = useState('');
  const [moleculeData, setMoleculeData] = useState(null);

  const handleCalculate = (data: any) => {
    // Placeholder for calculation logic
    setOutputText(JSON.stringify(data, null, 2));
    // Update molecule data for 3D visualization
    setMoleculeData(data);
  };

  return (
    <main className="flex-grow container mx-auto p-4 flex space-x-4">
      <LeftColumn onCalculate={handleCalculate} />
      <RightColumn outputText={outputText} moleculeData={moleculeData} />
    </main>
  );
}