import { useState } from "react";

export function CopyToClipboard(timeout = 500) {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    } catch (err) {
      console.error("Failed to copy: ", err);
      setCopied(false);
    }
  };

  return { copy, copied };
}
