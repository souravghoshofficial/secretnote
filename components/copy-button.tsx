"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Button onClick={handleCopy}  className="flex items-center cursor-pointer">
      {copied ? <Check className="w-6 h-6 mr-0.5" /> : <Copy className="w-6 h-6 mr-0.5" />}
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
}
