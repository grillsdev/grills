import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const CopyToClipboard = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await window.navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
    type='button'
      onClick={()=>void handleCopy()}
      className="p-2  rounded transition-colors cursor-pointer "
    >
      {copied ? (
        <Check size={18} className="text-green-500" />
      ) : (
        <Copy size={18} className="text-accent-foreground" />
      )}
    </button>
  );
};

export default CopyToClipboard;