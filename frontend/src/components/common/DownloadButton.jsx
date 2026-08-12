import { Download } from 'lucide-react';

function DownloadButton({ text, filename, label = 'Download TXT', className = '' }) {
  const handleDownload = () => {
    if (!text) return;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button type="button" onClick={handleDownload} className={`rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white ${className}`}>
      <Download size={14} className="mr-2 inline" />
      {label}
    </button>
  );
}

export default DownloadButton;
