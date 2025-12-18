import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Globe className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-border min-w-[120px]">
        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className={language === "en" ? "text-primary bg-primary/10" : ""}
        >
          🇬🇧 English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("lo")}
          className={language === "lo" ? "text-primary bg-primary/10" : ""}
        >
          🇱🇦 ລາວ
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
