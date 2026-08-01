import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      // size="icon"
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
    >
      {theme === "dark" ? (
        <span className="flex items-center gap-2">
          <Sun className="size-5" />
          Modo claro
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <Moon className="size-5" />
          Modo oscuro
        </span>
      )}
      {/* <span>{theme === "dark" ? "Modo claro" : "Modo oscuro"}</span> */}
    </Button>
  );
}