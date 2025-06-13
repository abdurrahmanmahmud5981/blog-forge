import Link from 'next/link'
import React from 'react'
import { BookOpen } from 'lucide-react';
import { ModeSwitch } from '@/components/layout/mode-switch';

const Navber = () => {
  return (
    <header className="w-svw mx-auto sticky top-0 z-40 border-b bg-background/50 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-screen-md items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 rounded-sm p-2">
         <BookOpen />
          <span className="hidden font-mono text-foreground sm:inline">
           BlogForge
          </span>
        </Link>
        <ModeSwitch />
      </div>
    </header>
  )
}

export default Navber
