"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "vi" ? "en" : "vi");
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleLanguage}>
      <Languages className="h-5 w-5" />
      <span className="sr-only">
        {language === "vi" ? "Tiếng Việt" : "English"}
      </span>
    </Button>
  );
}
