import { Github, Book, Users } from 'lucide-react';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';

export default function Header() {
  return (
    <header className="bg-background text-foreground p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">WebAtoms.js</div>
          <div className="text-sm text-muted-foreground">Molecular Structure Visualization</div>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="https://github.com/yourusername/webatoms-js" target="_blank" rel="noopener noreferrer">
            <Github className="w-6 h-6" />
          </Link>
          <Link href="/docs" target="_blank" rel="noopener noreferrer">
            <Book className="w-6 h-6" />
          </Link>
          <Link href="/forum" target="_blank" rel="noopener noreferrer">
            <Users className="w-6 h-6" />
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}