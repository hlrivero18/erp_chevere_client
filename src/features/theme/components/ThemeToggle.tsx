import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
    >
      {theme === "dark" ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </Button>
  );
}