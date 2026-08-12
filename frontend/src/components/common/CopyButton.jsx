import { Copy } from 'lucide-react';

function CopyButton({ text, label = 'Copy', className = '' }) {
  const handleCopy = async () => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <button type="button" onClick={handleCopy} className={`rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white ${className}`}>
      <Copy size={14} className="mr-2 inline" />
      {label}
    </button>
  );
}

export default CopyButton;
