import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, X, Sparkles, FileText, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import GradientButton from '../components/common/GradientButton';
import ErrorState from '../components/common/ErrorState';
import { analyzeResume } from '../services/api';

const formatFileSize = (bytes) => {
  if (!bytes) return '0 KB';
  const units = ['B', 'KB', 'MB', 'GB'];
  const size = Math.max(bytes, 1);
  const index = Math.min(Math.floor(Math.log(size) / Math.log(1024)), units.length - 1);
  const value = size / 1024 ** index;
  return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`;
};

function AnalyzePage() {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    try {
      const savedAnalysis = sessionStorage.getItem('resumeAnalysis') || localStorage.getItem('resumeAnalysis');
      if (savedAnalysis) {
        setAnalysis(JSON.parse(savedAnalysis));
      }
    } catch (error) {
      console.error('Stored resume analysis could not be restored:', error);
    }
  }, []);

  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) return;
    if (selectedFile.type !== 'application/pdf') {
      setErrorMessage('Only PDF resumes are supported for analysis.');
      return;
    }

    setErrorMessage('');
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
    setAnalysis(null);
    setErrorMessage('');
    setIsDragging(false);
    sessionStorage.removeItem('resumeAnalysis');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!file || isUploading) return;

    setIsUploading(true);
    setErrorMessage('');

    try {
      const response = await analyzeResume(file);
      setAnalysis(response.data);
      sessionStorage.setItem('resumeAnalysis', JSON.stringify(response.data));
      navigate('/dashboard', { state: response.data });
    } catch (error) {
      console.error('Resume analysis failed:', error);
      const serverMessage = error?.response?.data?.error || 'We could not analyze this resume. Please try again.';
      setErrorMessage(serverMessage);
      toast.error(serverMessage);
      setIsUploading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-6"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">Resume Upload Workspace</p>
            <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Analyze Resume</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">Upload your PDF and prepare it for the AI analysis pipeline.</p>
          </motion.div>

          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="rounded-[30px] border border-white/10 bg-white/5 p-5 shadow-[0_0_45px_rgba(37,99,235,0.14)] backdrop-blur-xl"
            >
              <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`flex min-h-80 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed px-5 text-center transition ${
                  isDragging ? 'border-cyan-300 bg-cyan-400/10' : 'border-cyan-400/40 bg-slate-950/35'
                }`}
              >
                <input ref={inputRef} type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />
                <UploadCloud size={38} className="mb-4 text-cyan-300" />
                <p className="text-xl font-semibold text-white">Drag & drop your PDF resume</p>
                <p className="mt-2 text-sm text-slate-400">or browse to select a file from your device</p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">Supported: PDF</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              className="rounded-[30px] border border-white/10 bg-white/5 p-5 shadow-[0_0_45px_rgba(37,99,235,0.14)] backdrop-blur-xl"
            >
              <div className="mb-4 flex items-center gap-2 text-cyan-200">
                <Sparkles size={18} />
                <p className="text-sm font-medium">Upload Summary</p>
              </div>

              {file ? (
                <div className="space-y-4">
                  <div className="rounded-[20px] border border-white/10 bg-slate-950/45 p-4">
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
                  </div>

                  {errorMessage ? (
                    <ErrorState title="Upload failed" description={errorMessage} onRetry={handleAnalyze} />
                  ) : null}

                  <GradientButton className="w-full" onClick={handleAnalyze} disabled={!file || isUploading}>
                    {isUploading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin" />
                        Uploading...
                      </span>
                    ) : (
                      'Analyze Resume'
                    )}
                  </GradientButton>
                </div>
              ) : (
                analysis ? (
                  <div className="rounded-[20px] border border-emerald-400/20 bg-emerald-400/10 p-4">
                    <p className="text-sm font-medium text-emerald-200">Previous analysis restored.</p>
                    <p className="mt-2 text-xs text-slate-300">ATS Score: {analysis['ATS Score'] ?? '—'}</p>
                    <button
                      type="button"
                      onClick={() => navigate('/dashboard', { state: analysis })}
                      className="mt-4 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-2 text-sm text-emerald-100"
                    >
                      View Analysis
                    </button>
                  </div>
                ) : (
                  <div className="rounded-[20px] border border-white/10 bg-slate-950/35 p-4">
                    <p className="text-sm text-slate-300">No file selected yet.</p>
                    <p className="mt-2 text-xs text-slate-400">Select a PDF to begin your AI analysis flow.</p>
                  </div>
                )
              )}
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}

export default AnalyzePage;
