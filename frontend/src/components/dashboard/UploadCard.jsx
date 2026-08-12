import { useRef } from 'react';
import { UploadCloud, FileText, LoaderCircle } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import GradientButton from '../common/GradientButton';

function UploadCard({ file, onFileChange, onAnalyze, loading, error }) {
  const inputRef = useRef(null);

  return (
    <GlassCard title="Upload Resume" subtitle="Drag and drop your PDF to run AI resume analysis">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div
          className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-[22px] border border-dashed border-cyan-400/40 bg-slate-950/40 px-4 text-center transition hover:border-cyan-300 hover:bg-slate-900/60"
          onClick={() => inputRef.current?.click()}
        >
          <input ref={inputRef} type="file" accept="application/pdf" className="hidden" onChange={onFileChange} />
          <UploadCloud className="mb-3 text-cyan-300" size={32} />
          <p className="text-lg font-semibold text-white">Drop your resume PDF here</p>
          <p className="mt-2 text-sm text-slate-400">or click to browse</p>

          {file && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200">
              <FileText size={14} />
              {file.name}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-[22px] bg-slate-950/35 p-4">
          <div>
            <p className="text-sm text-slate-400">Status</p>
            <p className="mt-2 text-lg font-semibold text-white">Ready for AI analysis</p>
            {error && <p className="mt-2 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">{error}</p>}
          </div>

          <GradientButton onClick={onAnalyze} disabled={!file || loading} className="w-full">
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <LoaderCircle size={16} className="animate-spin" />
                Analyzing...
              </span>
            ) : (
              'Analyze Resume'
            )}
          </GradientButton>
        </div>
      </div>
    </GlassCard>
  );
}

export default UploadCard;
