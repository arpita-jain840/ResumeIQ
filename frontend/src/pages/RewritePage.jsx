import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Loader2, Maximize2, RotateCcw, UploadCloud, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../components/landing/Navbar';
import GradientButton from '../components/common/GradientButton';
import PageHeader from '../components/common/PageHeader';
import LoadingOverlay from '../components/common/LoadingOverlay';
import EmptyState from '../components/common/EmptyState';
import CopyButton from '../components/common/CopyButton';
import DownloadButton from '../components/common/DownloadButton';
import AnimatedCard from '../components/common/AnimatedCard';
import { rewriteResume } from '../services/api';

const formatFileSize = (bytes) => {
  if (!bytes) return '0 KB';
  const units = ['B', 'KB', 'MB', 'GB'];
  const size = Math.max(bytes, 1);
  const index = Math.min(Math.floor(Math.log(size) / Math.log(1024)), units.length - 1);
  const value = size / 1024 ** index;
  return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`;
};

const loadingMessages = [
  'Rewriting Resume...',
  'Improving ATS...',
  'Optimizing Bullet Points...',
  'Almost Finished...',
];

function RewritePage() {
  const inputRef = useRef(null);
  const resumeRef = useRef(null);
  const [file, setFile] = useState(null);
  const [rewrittenResume, setRewrittenResume] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) return;
    if (selectedFile.type !== 'application/pdf') return;
    setFile(selectedFile);
  };

  const handleFileChange = (event) => {
    validateAndSetFile(event.target.files?.[0] || null);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    validateAndSetFile(event.dataTransfer.files?.[0] || null);
  };

  const handleRemove = () => {
    setFile(null);
    setRewrittenResume('');
    setIsDragging(false);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleRewrite = async () => {
    if (!file || isLoading) return;

    setIsLoading(true);
    setLoadingIndex(0);

    const interval = setInterval(() => {
      setLoadingIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 900);

    try {
      const response = await rewriteResume(file);
      setRewrittenResume(response.data.rewritten_resume || '');
      setPdfUrl(response.data.pdf_url || '');
      toast.success('Resume rewrite generated successfully.');
    } catch (error) {
      console.error('Resume rewrite failed:', error);
      setPdfUrl('');
      toast.error(error?.response?.data?.error || 'Resume rewrite failed. Please try again.');
    } finally {
      clearInterval(interval);
      setIsLoading(false);
    }
  };
  const downloadPDF = () => {
    if (!pdfUrl) return;
    window.open(pdfUrl, '_blank');
  };
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050816] px-4 py-8 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <PageHeader
            eyebrow="Resume Rewrite Workspace"
            title="AI Resume Rewrite"
            description="Upload a resume, generate a polished rewrite, and refine the final output with a rich editing workflow."
          />

          <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
            <AnimatedCard className="min-h-[330px]">
              <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`flex min-h-[330px] cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed px-5 text-center transition ${
                  isDragging ? 'border-cyan-300 bg-cyan-400/10' : 'border-cyan-400/40 bg-slate-950/35'
                }`}
              >
                <input ref={inputRef} type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />
                <UploadCloud size={38} className="mb-4 text-cyan-300" />
                <p className="text-xl font-semibold text-white">Drop your PDF here</p>
                <p className="mt-2 text-sm text-slate-400">or browse a file from your device to rewrite it with AI.</p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">Supported: PDF</span>
                </div>
              </div>

              {file ? (
                <div className="mt-4 rounded-[22px] border border-white/10 bg-slate-950/45 p-4">
                  <div className="flex items-start gap-3">
                    <FileText size={18} className="mt-1 text-cyan-300" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white">{file.name}</p>
                      <p className="mt-1 text-xs text-slate-400">{formatFileSize(file.size)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemove}
                      className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200"
                      aria-label="Remove file"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <div className="mt-4">
                    <GradientButton className="w-full" onClick={handleRewrite} disabled={!file || isLoading}>
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <Loader2 size={16} className="animate-spin" />
                          {loadingMessages[loadingIndex]}
                        </span>
                      ) : (
                        'Generate Resume'
                      )}
                    </GradientButton>
                  </div>
                </div>
              ) : null}
            </AnimatedCard>

            <AnimatedCard className="min-h-[330px]">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <CopyButton text={rewrittenResume} label="Copy" />
                <DownloadButton text={rewrittenResume} filename="resume-rewrite.txt" label="Download TXT" />
                <button
                  type="button"
                  onClick={downloadPDF}
                  disabled={!rewrittenResume}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white disabled:opacity-50"
                >
                  Download PDF
                </button>
                <button type="button" onClick={handleRewrite} disabled={!file || isLoading} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                  <RotateCcw size={14} className="mr-2 inline" />
                  Regenerate
                </button>
              </div>

              <div
  ref={resumeRef}
  className={`rounded-3xl border border-cyan-400/20 bg-slate-950/65 p-4 font-mono text-sm leading-6 text-slate-200 ${
    isExpanded ? 'min-h-130' : 'max-h-105 overflow-auto'
  }`}
>
                {isLoading ? (
                  <LoadingOverlay message={loadingMessages[loadingIndex]} subtext="AI is generating a stronger resume draft." />
                ) : rewrittenResume ? (
                  rewrittenResume
                ) : (
                  <EmptyState
                    title="No rewritten resume available."
                    description="Upload a PDF and generate a fresh AI rewrite."
                    buttonLabel="Generate Resume"
                    buttonTo="/analyze"
                  />
                )}
              </div>
            </AnimatedCard>
          </div>
        </div>
      </main>
      <Toaster position="top-right" />
    </>
  );
}

export default RewritePage;
