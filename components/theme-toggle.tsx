"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button";

import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
    const { setTheme, theme } = useTheme();
  
    const toggleDL = () => {
      if (theme == "light") {
        setTheme("dark");
      } else {
        setTheme("light")
      }
    }
  
    return (
      <Button variant="outline" size="icon" className="rounded-full h-9 w-9" onClick={() => toggleDL()}>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    )
  }