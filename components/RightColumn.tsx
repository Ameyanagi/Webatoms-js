"use client"

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

declare global {
  interface Window {
    $3Dmol: any;
  }
}

export default function RightColumn({ outputText, moleculeData }) {
  const { toast } = useToast();
  const viewerRef = useRef(null);

  useEffect(() => {
    if (moleculeData && viewerRef.current) {
      const viewer = window.$3Dmol.createViewer(viewerRef.current, {
        backgroundColor: 'white',
      });
      viewer.addModel(moleculeData, 'xyz');
      viewer.setStyle({}, { stick: {} });
      viewer.zoomTo();
      viewer.render();
    }
  }, [moleculeData]);

  const handleSave = () => {
    localStorage.setItem('outputText', outputText);
    toast({
      title: "Output saved",
      description: "The output has been saved to local storage.",
    });
  };

  return (
    <div className="w-1/2 space-y-4 flex flex-col h-full">
      <Textarea
        value={outputText}
        onChange={(e) => {/* Update output text if needed */}}
        placeholder="Calculation output will appear here..."
        className="flex-grow"
        style={{ resize: 'none' }}
      />
      <Button onClick={handleSave}>Save</Button>
      <div ref={viewerRef} style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
}