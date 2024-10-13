"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

export default function LeftColumn({ onCalculate }) {
  const { toast } = useToast();
  const [file, setFile] = useState(null);
  const [element, setElement] = useState('');
  const [edge, setEdge] = useState('');
  const [calculationType, setCalculationType] = useState('');
  const [ipotStyle, setIpotStyle] = useState('');
  const [inputType, setInputType] = useState('Crystal');
  const [xyzCoordinates, setXyzCoordinates] = useState('');
  const [atoms, setAtoms] = useState([{ abs: false, element: '', x: '', y: '', z: '', tag: '' }]);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      toast({
        title: "File uploaded",
        description: `${uploadedFile.name} has been uploaded successfully.`,
      });
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    toast({
      title: "File removed",
      description: "The uploaded file has been removed.",
    });
  };

  const handleCalculate = () => {
    const data = {
      file,
      element,
      edge,
      calculationType,
      ipotStyle,
      inputType,
      atoms,
      // Add other relevant data
    };
    onCalculate(data);
  };

  useEffect(() => {
    const lastAtom = atoms[atoms.length - 1];
    if (lastAtom.element && lastAtom.x && lastAtom.y && lastAtom.z) {
      setAtoms([...atoms, { abs: false, element: '', x: '', y: '', z: '', tag: '' }]);
    }
  }, [atoms]);

  return (
    <div className="w-1/2 space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer" onClick={() => document.getElementById('fileInput').click()}>
        <input
          id="fileInput"
          type="file"
          className="hidden"
          onChange={handleFileUpload}
          accept=".cif,.xyz"
        />
        <p>Click or drag to upload .cif or .xyz files</p>
      </div>
      {file && (
        <div className="flex justify-between items-center">
          <span>{file.name}</span>
          <Button variant="destructive" onClick={handleRemoveFile}>Remove</Button>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <Label className="w-1/3">Element</Label>
          <Select onValueChange={setElement} className="w-2/3">
            <SelectTrigger>
              <SelectValue placeholder="Select Element" />
            </SelectTrigger>
            <SelectContent>
              {/* Add periodic table elements here */}
              <SelectItem value="H">Hydrogen</SelectItem>
              <SelectItem value="He">Helium</SelectItem>
              {/* ... */}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center">
          <Label className="w-1/3">Edge</Label>
          <Select onValueChange={setEdge} className="w-2/3">
            <SelectTrigger>
              <SelectValue placeholder="Select Edge" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="K">K</SelectItem>
              <SelectItem value="L3">L3</SelectItem>
              <SelectItem value="L2">L2</SelectItem>
              <SelectItem value="L1">L1</SelectItem>
              <SelectItem value="M">M</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center">
          <Label className="w-1/3">Calculation Type</Label>
          <Select onValueChange={setCalculationType} className="w-2/3">
            <SelectTrigger>
              <SelectValue placeholder="Select Calculation Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EXAFS">EXAFS</SelectItem>
              <SelectItem value="XANES(FEFF)">XANES(FEFF)</SelectItem>
              <SelectItem value="XANES(FDMNES)">XANES(FDMNES)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {(calculationType === 'EXAFS' || calculationType === 'XANES(FEFF)') && (
          <div className="flex items-center">
            <Label className="w-1/3">IPOT Style</Label>
            <Select onValueChange={setIpotStyle} className="w-2/3">
              <SelectTrigger>
                <SelectValue placeholder="Select IPOT Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FEFF6">FEFF6</SelectItem>
                <SelectItem value="FEFF8">FEFF8</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center">
          <Label className="w-1/2">Cluster size</Label>
          <Input type="number" className="w-1/2" />
        </div>
        <div className="flex items-center">
          <Label className="w-1/2">Longest path</Label>
          <Input type="number" className="w-1/2" />
        </div>
        <div className="flex items-center">
          <Label className="w-1/2">SCF radius</Label>
          <Input type="number" className="w-1/2" />
        </div>
        {calculationType === 'XANES(FDMNES)' && (
          <>
            <div className="flex items-center">
              <Label className="w-1/2">Ecut</Label>
              <Input type="number" className="w-1/2" />
            </div>
            <div className="flex items-center">
              <Label className="w-1/2">Ecut1</Label>
              <Input type="number" className="w-1/2" />
            </div>
          </>
        )}
      </div>
      <Tabs value={inputType} onValueChange={setInputType}>
        <TabsList>
          <TabsTrigger value="Crystal">Crystal</TabsTrigger>
          <TabsTrigger value="Molecule">Molecule</TabsTrigger>
        </TabsList>
        <TabsContent value="Crystal">
          <div className="space-y-2">
            <Input placeholder="Space group" />
            <div className="grid grid-cols-3 gap-2">
              <Input placeholder="A" />
              <Input placeholder="B" />
              <Input placeholder="C" />
              <Input placeholder="α" />
              <Input placeholder="β" />
              <Input placeholder="γ" />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="Molecule">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Input xyz coordinates by text</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Input XYZ Coordinates</DialogTitle>
              </DialogHeader>
              <Textarea
                value={xyzCoordinates}
                onChange={(e) => setXyzCoordinates(e.target.value)}
                placeholder="Paste your XYZ coordinates here..."
                rows={10}
              />
              <Button onClick={() => {
                // Parse xyzCoordinates and update atoms state
                // This is a placeholder and should be implemented based on your specific needs
                toast({
                  title: "Coordinates applied",
                  description: "XYZ coordinates have been applied to the table.",
                });
              }}>Apply</Button>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
      <div className="space-y-2">
        <Label>Atoms</Label>
        {atoms.map((atom, index) => (
          <div key={index} className="flex space-x-2 items-center">
            <div className="flex items-center justify-center w-8">
              <Checkbox
                checked={atom.abs}
                onCheckedChange={(checked) => {
                  const newAtoms = [...atoms];
                  newAtoms[index].abs = checked;
                  setAtoms(newAtoms);
                }}
              />
            </div>
            <Select
              value={atom.element}
              onValueChange={(value) => {
                const newAtoms = [...atoms];
                newAtoms[index].element = value;
                newAtoms[index].tag = `${value}${index + 1}`;
                setAtoms(newAtoms);
              }}
            >
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Element" />
              </SelectTrigger>
              <SelectContent>
                {/* Add periodic table elements here */}
                <SelectItem value="H">H</SelectItem>
                <SelectItem value="He">He</SelectItem>
                {/* ... */}
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="x"
              value={atom.x}
              onChange={(e) => {
                const newAtoms = [...atoms];
                newAtoms[index].x = e.target.value;
                setAtoms(newAtoms);
              }}
              className="w-20"
            />
            <Input
              type="number"
              placeholder="y"
              value={atom.y}
              onChange={(e) => {
                const newAtoms = [...atoms];
                newAtoms[index].y = e.target.value;
                setAtoms(newAtoms);
              }}
              className="w-20"
            />
            <Input
              type="number"
              placeholder="z"
              value={atom.z}
              onChange={(e) => {
                const newAtoms = [...atoms];
                newAtoms[index].z = e.target.value;
                setAtoms(newAtoms);
              }}
              className="w-20"
            />
            <Input
              placeholder="Tag"
              value={atom.tag}
              readOnly
              className="w-20"
            />
          </div>
        ))}
      </div>
      <Button onClick={handleCalculate}>Calculate</Button>
    </div>
  );
}