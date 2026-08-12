import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
// import { FileText, Printer, RotateCcw, UploadCloud, X } from 'lucide-react';
import { FileText, Printer, RotateCcw, UploadCloud, X, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../components/landing/Navbar';
import GradientButton from '../components/common/GradientButton';
import PageHeader from '../components/common/PageHeader';
import LoadingOverlay from '../components/common/LoadingOverlay';
import EmptyState from '../components/common/EmptyState';
import CopyButton from '../components/common/CopyButton';
import DownloadButton from '../components/common/DownloadButton';
import AnimatedCard from '../components/common/AnimatedCard';
import { generateCoverLetter } from '../services/api';

const formatFileSize = (bytes) => {
  if (!bytes) return '0 KB';
  const units = ['B', 'KB', 'MB', 'GB'];
  const size = Math.max(bytes, 1);
  const index = Math.min(Math.floor(Math.log(size) / Math.log(1024)), units.length - 1);
  const value = size / 1024 ** index;
  return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`;
};

function CoverLetterPage() {
  const inputRef = useRef(null);
  // const [file, setFile] = useState(null);
  // const [jobDescription, setJobDescription] = useState('');
  // const [coverLetter, setCoverLetter] = useState('');
  // const [isDragging, setIsDragging] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [generationType, setGenerationType] = useState('cover');
  const [coverLetter, setCoverLetter] = useState('');
  const [selectedType, setSelectedType] = useState('cover');
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    setCoverLetter('');
    setIsDragging(false);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };
  const getTypeLabel = (type) => {
  const labels = {
    cover: 'Cover Letter',
    email: 'Job Application Email',
    dm: 'LinkedIn DM',
    referral: 'Referral Request',
  };

  return labels[type] || 'Response';
};


  const handleGenerate = async () => {
    if (!file || !jobDescription.trim() || isLoading) return;

    setIsLoading(true);

    try {
      // const response = await generateCoverLetter(file, jobDescription);
      // setCoverLetter(response.data.cover_letter || '');
      // toast.success('Cover letter generated successfully.');
      const response = await generateCoverLetter(
      file,
      jobDescription,
      selectedType
      );

      setCoverLetter(response.data.cover_letter || '');

      toast.success(
      `${getTypeLabel(selectedType)} generated successfully.`
    );
    } catch (error) {
      console.error('Cover letter generation failed:', error);
      toast.error(error?.response?.data?.error || 'Cover letter generation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    if (!coverLetter) return;
    window.print();
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050816] px-4 py-8 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <PageHeader
            eyebrow="Cover Letter Generator"
            title="Professional Cover Letter"
            description="Upload your resume, paste the job description, and generate a polished AI-written cover letter."
          />

          <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
            <AnimatedCard className="min-h-70">
              <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed px-5 text-center transition ${
                  isDragging ? 'border-cyan-300 bg-cyan-400/10' : 'border-cyan-400/40 bg-slate-950/35'
                }`}
              >
                <input ref={inputRef} type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />
                <UploadCloud size={38} className="mb-4 text-cyan-300" />
                <p className="text-xl font-semibold text-white">Drop your PDF here</p>
                <p className="mt-2 text-sm text-slate-400">or browse a resume file from your device</p>
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
                </div>
              ) : null}

              <div className="mb-4">
  <label className="mb-2 block text-sm font-medium text-white">
    What do you want AI to write?
  </label>

  <div className="grid grid-cols-2 gap-2">
    {[
      {
        value: 'cover',
        label: 'Cover Letter',
        description: 'Formal application'
      },
      {
        value: 'email',
        label: 'Job Email',
        description: 'Application email'
      },
      {
        value: 'dm',
        label: 'LinkedIn DM',
        description: 'Short recruiter message'
      },
      {
        value: 'referral',
        label: 'Referral Request',
        description: 'Ask for referral'
      }
    ].map((option) => (
      <button
        key={option.value}
        type="button"
        onClick={() => setGenerationType(option.value)}
        className={`rounded-2xl border p-3 text-left transition ${
          generationType === option.value
            ? 'border-cyan-400 bg-cyan-400/10'
            : 'border-white/10 bg-white/5 hover:border-cyan-400/40'
        }`}
      >
        <div className="text-sm font-semibold text-white">
          {option.label}
        </div>

        <div className="mt-1 text-xs text-slate-400">
          {option.description}
        </div>
      </button>
    ))}
  </div>
</div>

              <div className="mt-4 rounded-[22px] border border-white/10 bg-slate-950/45 p-4">
                <label className="mb-2 block text-sm font-medium text-white">
                  What do you want AI to write?
                </label>

                <select
                  value={selectedType}
                  onChange={(event) => setSelectedType(event.target.value)}
                  className="mb-4 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none">
                  <option value="cover">Cover Letter</option>
                  <option value="email">Job Application Email</option>
                  <option value="dm">LinkedIn DM</option>
                  <option value="referral">Referral Request</option>
                </select>
                <label className="mb-2 block text-sm font-medium text-white">Job Description</label>
                <textarea
                  value={jobDescription}
                  onChange={(event) => setJobDescription(event.target.value)}
                  placeholder="Paste the role description, responsibilities, and requirements here..."
                  className="min-h-60 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                />

                <div className="mt-4">
                  <GradientButton className="w-full" onClick={handleGenerate} disabled={!file || !jobDescription.trim() || isLoading}>
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin" />
                        Generating Cover Letter...
                      </span>
                    ) : (
                      // 'Generate Cover Letter'
                      `Generate ${getTypeLabel(selectedType)}`
                    )}
                  </GradientButton>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard className="min-h-80">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <div className="mb-4">
                <p className="text-lg font-semibold text-white">
                  {getTypeLabel(selectedType)}
                </p>

                <p className="text-xs text-slate-400">
                  AI-generated and tailored to the provided job description
                </p>
              </div>
                <CopyButton text={coverLetter} label="Copy" />
                <DownloadButton
                  text={coverLetter}
                  filename={`${selectedType}.txt`}
                  label="Download TXT"
                />                <button type="button" onClick={handlePrint} disabled={!coverLetter} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                  <Printer size={14} className="mr-2 inline" />
                  Print
                </button>
                <button type="button" onClick={handleGenerate} disabled={!file || !jobDescription.trim() || isLoading} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                  <RotateCcw size={14} className="mr-2 inline" />
                  Regenerate
                </button>
              </div>

              <div className="rounded-3xl border border-cyan-400/20 bg-slate-950/65 p-4 text-sm leading-6 text-slate-200">
                {isLoading ? (
                  <LoadingOverlay message="Generating Cover Letter..." subtext="AI is tailoring a professional letter for this role." />
                ) : coverLetter ? (
                  <div className="whitespace-pre-wrap">{coverLetter}</div>
                ) : (
                  <EmptyState
                    title="No cover letter generated yet."
                    description="Upload a resume and paste a job description to begin."
                    buttonLabel="Go Analyze Resume"
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

export default CoverLetterPage;
